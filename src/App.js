import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProductList from './components/productList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/addProduct'
function App() {
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProduct] = useState([])
  const [categories, setCategories] = useState([])

  const fetchProduct = () => {
    axios.get('https://upayments-studycase-api.herokuapp.com/api/products', { headers: { "Authorization": `Bearer ${process.env.REACT_APP_SECRET_CODE}` } }).
      then((res) => res.data).then(({ products }) => {
        setProducts(products)
        setFilterProduct(products)
      })
  }

  const fetchCatagories = () => {
    axios.get(`https://upayments-studycase-api.herokuapp.com/api/categories`, { headers: { "Authorization": `Bearer ${process.env.REACT_APP_SECRET_CODE}` } }).
    then((res) => res.data).then(({ categories }) => setCategories(categories))
  }
  useEffect(() => {
    fetchProduct();
    fetchCatagories();
  }, [])

  const handleFilter = (value) => {
    const filtered = products.filter(product => product.category.includes(value))
    setFilterProduct(filtered)
  }

  const searchProducts = (value) => {
    const filtered = products.filter(product => product.category.toLowerCase().includes(value.toLowerCase()) || product.name.toLowerCase().includes(value.toLowerCase()))
    setFilterProduct(filtered)
  }
  return (
    <div className="p-16 ">
      <div className="bg-white py-3 px-3 flex justify-between rounded">
        <h1 className="flex-1 font-bold br-4"> U Payment Store </h1>
        <h1 className="font-bold"> Register </h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<ProductList products={filterProducts} categories={categories} handleFilter={handleFilter} searchProducts={searchProducts}/>} />
          <Route path='details/:id' element={<ProductDetails />} />
          <Route path='add' element={<AddProduct fetchProduct={fetchProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
