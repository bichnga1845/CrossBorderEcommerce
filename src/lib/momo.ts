import crypto from 'crypto';

export interface MomoCreatePaymentInput {
  orderId: string;
  amount: number;
  orderInfo: string;
  redirectUrl: string;
  ipnUrl: string;
  extraData?: string;
  requestType?: string;
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function buildSignature(payload: Record<string, string>, secretKey: string) {
  const rawSignature = [
    `accessKey=${payload.accessKey}`,
    `amount=${payload.amount}`,
    `extraData=${payload.extraData}`,
    `ipnUrl=${payload.ipnUrl}`,
    `orderId=${payload.orderId}`,
    `orderInfo=${payload.orderInfo}`,
    `partnerCode=${payload.partnerCode}`,
    `redirectUrl=${payload.redirectUrl}`,
    `requestId=${payload.requestId}`,
    `requestType=${payload.requestType}`,
  ].join('&');

  return crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
}

export async function createMomoPaymentUrl(input: MomoCreatePaymentInput) {
  const partnerCode = getRequiredEnv('MOMO_PARTNER_CODE');
  const accessKey = getRequiredEnv('MOMO_ACCESS_KEY');
  const secretKey = getRequiredEnv('MOMO_SECRET_KEY');
  const endpoint = getRequiredEnv('MOMO_ENDPOINT');

  const requestId = `${partnerCode}-${Date.now()}`;
  const requestType = input.requestType || 'captureWallet';
  const extraData = input.extraData || '';
  const amount = String(Math.round(input.amount));

  const payload = {
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId: input.orderId,
    orderInfo: input.orderInfo,
    redirectUrl: input.redirectUrl,
    ipnUrl: input.ipnUrl,
    extraData,
    requestType,
  };

  const signature = buildSignature(payload, secretKey);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      lang: 'vi',
      signature,
    }),
  });

  const responseText = await response.text();
  let data: any = {};

  if (responseText.trim()) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.raw || 'MoMo payment request failed');
  }

  const paymentUrl = data.payUrl || data.deeplink || data.shortLink;

  if (!paymentUrl) {
    throw new Error('MoMo did not return a payment URL');
  }

  return {
    paymentUrl,
    response: data,
  };
}
