import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../model/productParams";

// Nilai awal untuk semua parameter filter & pagination
// Digunakan saat aplikasi pertama kali load atau saat reset
export const initialState: ProductParams = {
  orderBy: "name", // Urutan default by nama
  searchTerm: "", // Pencarian kosong by default
  brands: [], // Semua brand ditampilkan
  types: [], // Semua type ditampilkan
  pageNumber: 1, // Mulai dari halaman pertama
  pageSize: 8, // Tampilkan 8 product per halaman
};

// Slice untuk mengelola state filter & pagination di catalog
// Setiap perubahan filter akan mereset pageNumber ke 1
// agar user tidak stuck di halaman yang tidak ada datanya
export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    // Ubah urutan product (contoh: "name" | "priceAsc" | "priceDesc")
    // Reset ke halaman 1 agar hasil urutan tampil dari awal
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },

    // Ubah keyword pencarian
    // Reset ke halaman 1 agar hasil pencarian tampil dari awal
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },

    // Ubah filter brand yang dipilih (bisa lebih dari 1)
    // Contoh payload: ["Nike", "Adidas"]
    // Reset ke halaman 1 agar hasil filter tampil dari awal
    setBrands: (state, action) => {
      state.brands = action.payload;
      state.pageNumber = 1;
    },

    // Ubah filter type yang dipilih (bisa lebih dari 1)
    // Contoh payload: ["Boots", "Sandals"]
    // Reset ke halaman 1 agar hasil filter tampil dari awal
    setTypes: (state, action) => {
      state.types = action.payload;
      state.pageNumber = 1;
    },

    // Pindah ke halaman tertentu
    // Contoh payload: 2 → pindah ke halaman 2
    // Tidak reset pageNumber karena memang tujuannya ganti halaman
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    // Ubah jumlah product yang ditampilkan per halaman
    // Contoh payload: 12 → tampilkan 12 product per halaman
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },

    // Reset semua filter & pagination ke nilai awal (initialState)
    // Dipanggil saat user klik tombol "Reset" atau keluar dari halaman catalog
    resetParams: () => {
      return initialState;
    },
  },
});

// Export semua action agar bisa di-dispatch dari component mana saja
// Contoh penggunaan di component:
//   dispatch(setSearchTerm("boot"))
//   dispatch(setBrands(["Nike", "Adidas"]))
//   dispatch(resetParams())
export const { setOrderBy, setSearchTerm, setBrands, setTypes, setPageNumber, setPageSize } = catalogSlice.actions;
