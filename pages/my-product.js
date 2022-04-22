import Image from 'next/image';
import Link from 'next/link';
import React ,{useState,useEffect} from 'react';
import Navbar from '../components/navbar';
import { supabase } from '../utils/SupabaseClient';

const MyProduct = () => {
    const user = supabase.auth.user();
    const [ products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data: products } = await supabase
          .from('product')
          .select('*')
          .match({user_id: user.id})
        setProducts(products);
      };
      useEffect(() => {
       fetchProducts()
      });
    

    return (
        <>
        <Navbar />
        <div className="grid grid-cols-3 gap-4">
       {products.map((product)=>(
         <><div key={product.id} className="w-full max-w-3xl mx-auto my-16 px-2">
           <Image src={product.photo} alt="" width={200} height={200} layout="responsive" />
           <p>Price : {product.price}</p>
         </div>
         </>
         )
       )}
    </div>
        </>
    );
    if( products.length === 0){
        return(
            <>
            <Navbar />
            <div className="h-screen flex flex-col items-center justify-center">
            <p>You have not publish any product</p>
            <Link href="/create-product"><a className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2">
                Create a product
                </a></Link>
            </div>
            </>
        )
    }
}

export default MyProduct;
