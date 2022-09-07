import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function AddProduct({fetchProduct}) {
  const [value, setValue] = useState({ name: "", price: 0, category: "", avatar: "",description :"" })
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    console.log('inside')
    axios.get(`https://upayments-studycase-api.herokuapp.com/api/categories`, { headers: { "Authorization": `Bearer ${process.env.REACT_APP_SECRET_CODE}` } }).
      then((res) => res.data).then(({ categories }) => setCategories(categories))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue({ ...value, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());
    if(!values.name){
      return;
    }
    if(!values.price){
      return;
    }
    if(!values.avatar){
      return;
    }
    axios.post('https://upayments-studycase-api.herokuapp.com/api/products',{...values,developerEmail:'pankaj.patan3@gmail.com'} ,{ headers: { "Authorization": `Bearer ${process.env.REACT_APP_SECRET_CODE}` } } ).
    then((res)=>res.data).then(({message})=> {
      if(message.includes('Success')){
        fetchProduct();
        navigate('/')
      }
      return
    })
  }

  return (
    <div className="text-center  py-10">
      <h1 className="text-4xl font-bold"> Create Product </h1>
      <form onSubmit={handleSubmit}>
      <div>
        <input value={value.name} onChange={handleChange} className="shadow  ml-auto appearance-none border rounded-lg w-4/12 py-2 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Product name"/>
      </div>
      <div>
        <input value={value.description} onChange={handleChange} className="shadow  ml-auto appearance-none border rounded-lg w-4/12 pt-2 pb-16 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="description" type="text" placeholder="Description"/>
      </div>
      <div>
        <input value={value.avatar} onChange={handleChange} className="shadow  ml-auto appearance-none border rounded-lg w-4/12 py-2 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="avatar" type="text" placeholder="image url"/>
      </div>
      <div>
        <select onChange={handleChange} value={value.category} className="shadow  ml-auto bg-white border rounded-lg w-4/12 py-2 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category" type="select" >
          {categories.map((item) => (
            <option key={item._id} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <div>
        <input value={value.price} onChange={handleChange} className="shadow  ml-auto appearance-none border rounded-lg w-4/12 py-2 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="price" type="text" placeholder="price"/>
      </div>
      <div>
        <input type="submit" className="shadow bg-white font-bold  ml-auto appearance-none border rounded-lg w-4/12 py-2 my-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      </form>
    </div>
  )
}

export default AddProduct