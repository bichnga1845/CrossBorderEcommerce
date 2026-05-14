"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";

export default function CartSync() {
  const { data: session, status } = useSession();
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const initialLoadDone = useRef(false);

  // 1. Initial Load: When user logs in, fetch cart from DB and merge/replace
  useEffect(() => {
    if (status === "authenticated" && !initialLoadDone.current) {
      fetch("/api/user/cart")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.cart) {
            if (data.cart.length > 0) {
              // If DB has items, we use them
              setItems(data.cart);
            } else if (items.length > 0) {
              // If DB is empty but local has items, push local to DB
              fetch("/api/user/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart: items }),
              });
            }
          }
          initialLoadDone.current = true;
        })
        .catch((err) => console.error("Error fetching cart from DB:", err));
    }
    
    if (status === "unauthenticated") {
      initialLoadDone.current = false;
    }
  }, [status, setItems, items]);

  // 2. Sync to Server: Whenever items change and user is logged in
  useEffect(() => {
    if (status === "authenticated" && initialLoadDone.current) {
      const timeoutId = setTimeout(() => {
        fetch("/api/user/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: items }),
        }).catch((err) => console.error("Error syncing cart to DB:", err));
      }, 500); // Faster sync (500ms)

      return () => clearTimeout(timeoutId);
    }
  }, [items, status]);

  return null; // This is a logic-only component
}
