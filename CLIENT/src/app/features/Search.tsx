import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { setSearchTerm } from "../pages/catalog/catalogSlice";

export default function Search() {
  // Ambil searchTerm dari Redux store (state global)
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  // Buat state lokal "term" sebagai nilai sementara input
  // Diinisialisasi dengan searchTerm dari Redux
  const [term, setTerm] = useState(searchTerm);

  // Sinkronisasi state lokal "term" jika searchTerm di Redux berubah dari luar
  // Contoh: saat user reset filter, searchTerm Redux berubah → term lokal ikut update
  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  // Bungkus dispatch dengan debounce — tunda eksekusi 500ms setelah user berhenti mengetik
  // Tujuan: hindari terlalu banyak request ke Redux/API saat user masih mengetik
  // "event" → event object yang dikirim browser saat onChange terpanggil
  const debounceSearch = debounce((event) => {
    dispatch(setSearchTerm(event.target.value)); // kirim nilai input ke Redux setelah jeda 500ms
  }, 500);

  return (
    <>
      <TextField
        label="search products"
        variant="outlined"
        type="search"
        value={term} // controlled — nilai input dikontrol oleh state lokal "term"
        onChange={(e) => {
          setTerm(e.target.value); // update state lokal langsung (UI tetap responsif)
          debounceSearch(e); // kirim ke Redux, tapi ditunda 500ms
        }}
        fullWidth
      />
    </>
  );
}
