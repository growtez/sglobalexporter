"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore, CartItem } from "@/lib/store/cartStore";

export default function CartSync() {
  const { items, setItems } = useCartStore();
  const supabase = createClient();
  const initialized = useRef(false);
  const prevItemsRef = useRef<CartItem[]>(items);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    let subscription: any;

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        userIdRef.current = user.id;
        // Fetch cart from DB
        const { data: dbItems, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id);

        if (!error && dbItems) {
          // Merge logic: DB takes precedence, but if local has items not in DB, we keep them
          const currentLocalItems = useCartStore.getState().items;
          const dbMapped: CartItem[] = dbItems.map(dbItem => ({
            id: dbItem.product_id, // Map DB product_id back to CartItem.id
            name: dbItem.name,
            price_per_kg: Number(dbItem.price_per_kg),
            quantity_kg: Number(dbItem.quantity_kg),
            image_url: dbItem.image_url,
            slug: dbItem.slug,
            unit: dbItem.unit,
          }));
          const merged = [...dbMapped];

          // Add local items that aren't in DB
          currentLocalItems.forEach(localItem => {
            if (!merged.find(m => m.id === localItem.id)) {
              merged.push(localItem);
            }
          });

          setItems(merged);
          // Set prevItemsRef to dbMapped so the sync useEffect detects the merge and pushes to DB
          prevItemsRef.current = dbMapped;
        }
      } else {
        userIdRef.current = null;
      }
      
      initialized.current = true;

      // Listen for auth changes
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          userIdRef.current = session.user.id;
          const { data: dbItems } = await supabase
            .from("cart_items")
            .select("*")
            .eq("user_id", session.user.id);
            
          if (dbItems) {
            const currentLocalItems = useCartStore.getState().items;
            const dbMapped: CartItem[] = dbItems.map(dbItem => ({
              id: dbItem.product_id,
              name: dbItem.name,
              price_per_kg: Number(dbItem.price_per_kg),
              quantity_kg: Number(dbItem.quantity_kg),
              image_url: dbItem.image_url,
              slug: dbItem.slug,
              unit: dbItem.unit,
            }));
            const merged = [...dbMapped];
            
            currentLocalItems.forEach(localItem => {
              if (!merged.find(m => m.id === localItem.id)) {
                merged.push(localItem);
              }
            });
            setItems(merged);
            // Set prevItemsRef to dbMapped so the sync useEffect detects the merge and pushes to DB
            prevItemsRef.current = dbMapped;
          }
        } else if (event === "SIGNED_OUT") {
          userIdRef.current = null;
          setItems([]);
          prevItemsRef.current = [];
        }
      });
      subscription = data.subscription;
    };

    init();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [setItems, supabase]);

  // Sync to DB when local items change
  useEffect(() => {
    if (!initialized.current || !userIdRef.current) return;

    // Deep compare to avoid infinite loops
    const prevStr = JSON.stringify(prevItemsRef.current);
    const currStr = JSON.stringify(items);
    
    if (prevStr === currStr) return;
    
    const syncToDb = async () => {
      const userId = userIdRef.current;
      if (!userId) return;

      // Upsert current items
      if (items.length > 0) {
        const payload = items.map(item => ({
          user_id: userId,
          product_id: item.id,
          name: item.name,
          price_per_kg: item.price_per_kg,
          quantity_kg: item.quantity_kg,
          image_url: item.image_url,
          slug: item.slug,
          unit: item.unit
        }));

        await supabase
          .from("cart_items")
          .upsert(payload, { onConflict: "user_id, product_id" });
      }

      // Delete removed items
      const currentIds = items.map(i => i.id);
      if (currentIds.length > 0) {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", userId)
          .not("product_id", "in", `(${currentIds.join(",")})`);
      } else {
        // If cart is empty, delete all items for user
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", userId);
      }
    };

    syncToDb();
    prevItemsRef.current = items;
  }, [items, supabase]);

  return null; // This is a logic-only component
}
