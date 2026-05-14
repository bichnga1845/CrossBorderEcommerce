import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export default function QRCodeDisplay({ 
  url, 
  size = 200, 
  fgColor = "#1B3B26", // forest-900 
  bgColor = "#FFFFFF" 
}: QRCodeDisplayProps) {
  return (
    <div className="p-4 bg-white rounded-2xl inline-block shadow-sm border border-forest-900/10">
      <QRCodeSVG
        value={url}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        level="H" // High error correction, good for adding logos in the middle if needed later
      />
      <p className="text-center text-xs mt-3 text-forest-700/60 uppercase tracking-widest font-medium">Scan to Verify</p>
    </div>
  );
}
