// utils.ts
// Kumpulan helper function yang digunakan di seluruh aplikasi

import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { PaymentSummary, ShippingAddress } from "../model/order";

// Format harga dari satuan sen ke format dollar
// Contoh: currencyFormat(1000) → "$10.00"
// Kenapa dibagi 100? Karena harga di DB disimpan dalam satuan sen (cents)
export function currencyFormat(price: number) {
  return "$" + (price / 100).toFixed(2);
}

// Hapus nilai kosong dari object sebelum dikirim sebagai query params
// Contoh:
//   Input  → { searchTerm: "", orderBy: "price", brand: [], pageNumber: 1 }
//   Output → { orderBy: "price", pageNumber: 1 }
// Kenapa? Agar URL tidak kotor dengan parameter yang tidak perlu
// Contoh URL kotor: /api/products?searchTerm=&brand=&pageNumber=1
// Contoh URL bersih: /api/products?pageNumber=1
export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined && value.length !== 0,
    ),
  );
}

export const formatAddressString = (address: ShippingAddress) => {
  return `${address?.name}, ${address?.line1}, ${address.city}, ${address.state}, ${address?.postal_code}, ${address.country}`;
};

export const formatPaymentString = (card: PaymentSummary) => {
  return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
};

export function handleApiError<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  fieldNames: Path<TFieldValues>[],
) {
  const apiError = (error as { message: string }) || {};

  if (apiError.message && typeof apiError.message === "string") {
    const errorArray = apiError.message.split(",");
    errorArray.forEach((e) => {
      const matchField = fieldNames.find((fieldName) => e.toLowerCase().includes(fieldName.toString().toLowerCase()));

      if (matchField) setError(matchField, { message: e.trim() });
    });
  }
}
