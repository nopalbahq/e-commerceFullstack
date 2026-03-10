import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProduct } from "../model/product";

export default function ProductDetails() {
  // Hook
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  // fetch data
  useEffect(() => {
    fetch(`https://localhost:5001/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  return <div>{product?.name}</div>;
}
