import React, { useState } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import PlusIcon from '../assets/icons/plus-icon.svg'

function ProductList({products,categories,handleFilter,searchProducts}) {
const navigate = useNavigate();
const [selectCategory,setSelectCategory] = useState('')
const [search,setSearch] = useState('')

const filter = (e) => {
  setSelectCategory(e.target.value)
  handleFilter(e.target.value)
}

const handleSearch = (e)=>{
  setSearch(e.target.value)
  searchProducts(e.target.value)
}
  return (<> 
      <div className="flex justify-between py-10">
        <input type="text" value={search} onChange={handleSearch} className="w-80 p-2.5 text-gray-500 bg-white border rounded-lg shadow-sm outline-none  focus:border-indigo-600" placeholder="type something.."/>
        <div className="relative w-full lg:max-w-sm">
            <select value={selectCategory} onChange={filter} className="w-full p-2.5 text-gray-500 bg-white border rounded-lg shadow-sm outline-none  focus:border-indigo-600">
                {categories.map((category)=>(
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))}
            </select>
        </div>
      </div>
      <section className="flex flex-wrap" data-testid="productlist">
        {products.map((product) => (
          <Link  to={`/details/${product._id}`} className="flex flex-col grow basis-1/4 p-10 " key={product._id}>
            <img src={product.avatar} className="w-40 p-8 rounded-lg bg-white object-cover h-48" alt="icon-close" />
            <p className="font-bold my-2 px-5">{product.name}</p>
            <p className="font-bold my-2 px-5">{`$${product.price}`}</p>
          </Link>
        ))}
      <img onClick={()=> navigate('/add')} className="fixed bottom-0 right-0.5 cursor-pointer" src={PlusIcon} alt="icon-plus" />
      </section>
      </>
  );
}

export default ProductList;
