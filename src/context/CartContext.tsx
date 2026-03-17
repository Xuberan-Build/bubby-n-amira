"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addCartLine,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  type ShopifyCart,
} from "@/lib/shopify";

type CartContextType = {
  cart: ShopifyCart | null;
  cartCount: number;
  isLoading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    getCart(cartId).then((c) => {
      if (c) {
        setCart(c);
      } else {
        localStorage.removeItem(CART_ID_KEY);
      }
    });
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const cartId = localStorage.getItem(CART_ID_KEY);
      let updated: ShopifyCart;
      if (cartId) {
        updated = await addCartLine(cartId, variantId, quantity);
      } else {
        updated = await createCart(variantId, quantity);
        localStorage.setItem(CART_ID_KEY, updated.id);
      }
      setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setIsLoading(true);
    try {
      setCart(await updateCartLine(cartId, lineId, quantity));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    setIsLoading(true);
    try {
      setCart(await removeCartLine(cartId, lineId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cartCount =
    cart?.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, cartCount, isLoading, addToCart, updateLine, removeLine }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
