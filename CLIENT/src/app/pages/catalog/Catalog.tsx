import { useEffect, useState } from "react";
import ProductList from "../../features/ProductList";
import type { IProduct } from "../../model/product";

export default function Catalog() {
  const [products, setProducts] = useState<IProduct[]>([]);

  // do Fetch
  useEffect(() => {
    fetch("https://localhost:5001/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
