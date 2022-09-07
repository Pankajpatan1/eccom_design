import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
function ProductDetails() {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  console.log(id, 'id')
  useEffect(() => {
    axios.get(`https://upayments-studycase-api.herokuapp.com/api/products/${id}`, { headers: { "Authorization": `Bearer ${process.env.REACT_APP_SECRET_CODE}` } }).
      then((res) => res.data).then(({ product }) => setProduct(product))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="px-20 py-20 ml-50 mx-48 ">
      <div className="flex border-b-2 border-black py-10 ">
        <img src={product.avatar} className="w-40 p-10 rounded-lg bg-white object-cover h-48" alt="icon-close" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold px-5"> {product.name} </h1>
          <h1 className="text-xl  px-5 mt-auto"> {`$${product.price}`} </h1>
        </div>
      </div>
      <div>
        <h1 className="text-3xl py-5">Description</h1>
        <p> {product.description} </p>
      </div>
    </div>
  )
}

export default ProductDetails