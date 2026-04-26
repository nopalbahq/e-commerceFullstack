// utils.ts
// Kumpulan helper function yang digunakan di seluruh aplikasi

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
