import React, { useState } from 'react';
import { supabase } from '../utils/SupabaseClient';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const CreateProduct = () => {
    const user = supabase.auth.user();
    const router = useRouter();
    const [photo, setPhoto] = useState("");
    const [price, setPrice] = useState("");

    const handleCreate = async(e)=>{
        e.preventDefault();
        const {error} = await supabase
        .from('product')
        .insert({
            photo: photo,
            price: price,
            seller_email: user.email,
            user_id: user.id
        })
        if (error) {
            alert(JSON.stringify(error));
          } else {
            router.push('/');
          }
  
    }
    if (!user){
        return null
    }
    return (<>
        <Navbar />
        <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
            Publish your product to sell
        </h1>
        <div className="flex flex-col p-6">
            <form className="mt-2 flex flex-col" onSubmit={handleCreate}>
            <label  className="text-gray-200">
            Photo Url
          </label>
            <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
            type='text'
            placeholder='photo url'
            value={photo}
            onChange={(e) => {
            setPhoto(e.target.value);
          }}
        />
        <label  className="text-gray-200">
            Price
          </label>
        <input
          className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
          type='number'
          placeholder='price'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <button
            className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            type="submit"
          >
            Publish
          </button>
            </form>
        </div>
        </div>
        </div>
        </>
    );
}

export default CreateProduct;
