"use client";

import React from "react";
import { useCart } from "@/app/context/cart-context";

export default function CartPage() {
  const { cart, totalPrice, totalItems, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-3">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cart</h1>
          <p className="mt-1 text-sm text-gray-600">
            Items: {totalItems} • Total: ${totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 rounded object-contain"
                    />
                    <div className="max-w-[520px]">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">ID: {item.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">${item.price.toFixed(2)}</td>

                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="h-8 w-8 rounded border hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="h-8 w-8 rounded border hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}