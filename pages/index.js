import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { supabase } from "../utils/SupabaseClient";


export default function Home() {
  const [ products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data: products } = await supabase
      .from('product')
      .select('*')
    setProducts(products);
  };
  useEffect(() => {
   fetchProducts()
  }, []);

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 gap-4">
       {products.map((product)=>(
         <><div key={product.id} className="w-full max-w-3xl mx-auto my-16 px-2">
           <Image src={product.photo} alt="" width={200} height={200} layout="responsive" />
           <p>Price : {product.price}</p>
           <p>seller : {product.seller_email}</p>
         </div>
         </>
         )
       )}
    </div>
    </>
  )
}

