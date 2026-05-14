"use client";

import { useCartStore } from "@/store/useCartStore";

export default function DebugPage() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const testProduct = {
    productId: 'test-1',
    name: 'Test Product',
    price: 100000,
    quantity: 1,
    image: '/images/honey.png'
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Cart Debug Page</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="font-bold text-lg mb-2">Store State:</h2>
        <p className="mb-2"><strong>Items:</strong> {items.length} items in cart</p>
        <p className="mb-2"><strong>Is Open:</strong> {isOpen ? '✅ Yes' : '❌ No'}</p>
        <p className="mb-2"><strong>Total Price:</strong> {getTotalPrice().toLocaleString('vi-VN')} VND</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-2">Cart Items:</h3>
        {items.length === 0 ? (
          <p className="text-gray-600">Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between items-center bg-white p-2 rounded">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={() => {
            console.log('Clicking add item button');
            addItem(testProduct);
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          ✅ Add Test Product
        </button>

        <button
          onClick={() => toggleCart()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isOpen ? '🔴' : '🟢'} Toggle Cart (Currently: {isOpen ? 'Open' : 'Closed'})
        </button>

        {items.length > 0 && (
          <button
            onClick={() => removeItem(items[0].productId)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            🗑️ Remove First Item
          </button>
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Click &quot;Add Test Product&quot; to add an item</li>
          <li>Watch the state update above</li>
          <li>Check browser localStorage for &apos;aura-cart-storage&apos; key</li>
          <li>Reload page to see if items persist</li>
          <li>Check console logs for debug messages</li>
        </ol>
      </div>

      <div className="mt-8 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-xs">
        <h3 className="font-bold mb-2 text-white">Console Logs:</h3>
        <p>Open your browser developer console (F12) to see detailed logs</p>
      </div>
    </div>
  );
}
