"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";

export default function CartSync() {
  const { data: session } = useSession();
  const { items, setItems } = useCartStore();
  const isInitialMount = useRef(true);
  const lastSyncedItems = useRef(JSON.stringify(items));

  // Sync from Database on Login
  useEffect(() => {
    if (session?.user?.id) {
      const fetchCart = async () => {
        try {
          const res = await fetch("/api/user/cart");
          const data = await res.json();
          if (data.success && data.cart && data.cart.length > 0) {
            // Only set if local cart is empty or we want to overwrite
            // For a better UX, we might want to merge, but for now replace is simpler
            setItems(data.cart);
            lastSyncedItems.current = JSON.stringify(data.cart);
          }
        } catch (error) {
          console.error("Error fetching cart from DB:", error);
        }
      };
      fetchCart();
    }
  }, [session?.user?.id, setItems]);

  // Sync to Database on Change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!session?.user?.id) return;

    const currentItemsStr = JSON.stringify(items);
    if (currentItemsStr === lastSyncedItems.current) return;

    const saveCart = async () => {
      try {
        await fetch("/api/user/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: items })
        });
        lastSyncedItems.current = currentItemsStr;
      } catch (error) {
        console.error("Error saving cart to DB:", error);
      }
    };

    const timeoutId = setTimeout(saveCart, 2000); // Debounce save
    return () => clearTimeout(timeoutId);
  }, [items, session?.user?.id]);

  return null; // This is a logic-only component
}
