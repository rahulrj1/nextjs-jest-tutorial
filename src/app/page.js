'use client';
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DisplayBox from "./Components/displayBox";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  const fetchUsersData = async () => {
    const res = await axios.get('https://dummyjson.com/users');
    // console.log(res.data);
    setUsers(res.data.users.map(item => item.firstName + ' ' + item.lastName).slice(0, 15));
  }

  const fetchProductData = async () => {
    const res = await axios.get('https://dummyjson.com/products');
    // console.log(res);
    setProducts(res.data.products.map(item => item.title + ' : ' + item.description).slice(0, 10));
  }

  useEffect(() => {
    fetchUsersData();
    fetchProductData();
  }, [])

  return (
    <div>
      <h1 className="bg-black text-white p-2 flex justify-center">Nextjs jest tutorial</h1>
      {/* <DisplayBox /> */}

      <div className="flex text-sm">
        <div className="w-[20%] border p-2 m-2 border-lg border-black">
          <h1 className="font-bold">Here is a list of our users</h1>
          {users.map(user => {
            return <div key={user}>{user}</div>
          })}
        </div>



        <div className="border p-2 m-2 border-lg border-black">
          <h1 className="font-bold">Here is a list of our products</h1>
          {products.map(product => {
            return <div key={product}>{product}</div>
          })}
        </div>

      </div>

      <button data-test="about-button" onClick={()=>{router.push('/about/param')}} className="bg-black text-white p-2 m-2">About</button>


    </div>
  );
}
