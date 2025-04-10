import React, { useState } from 'react'
import { images } from '../assets/Assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [price, setPrice] = useState(25)
  const [size, setSize] = useState([])
  const [bestseller, setBestseller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('size', JSON.stringify(size))
      formData.append('bestseller', bestseller.toString())
      formData.append('image1', image1)
      formData.append('image2', image2)
      formData.append('image3', image3)
      formData.append('image4', image4)

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        toast.success('Product Added Successfully')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setName('')
        setDescription('')
        setCategory('Men')
        setSubCategory('Topwear')
        setPrice(0)
        setSize([])
        setBestseller(false)
      } else {
        console.log(error)
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while adding the product')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div className="">
        <p className="mb-2">Upload Image</p>
      </div>
      <div className="flex gap-2">
        <label htmlFor="image1">
          <img
            className="w-20"
            src={!image1 ? images.UpImage : URL.createObjectURL(image1)}
            alt=""
          />
          <input
            onChange={(e) => setImage1(e.target.files[0])}
            className="w-20"
            type="file"
            id="image1"
          />
        </label>
        <label htmlFor="image2">
          <img
            className="w-20"
            src={!image2 ? images.UpImage : URL.createObjectURL(image2)}
            alt=""
          />
          <input
            onChange={(e) => setImage2(e.target.files[0])}
            className="w-20"
            type="file"
            id="image2"
          />
        </label>
        <label htmlFor="image3">
          <img
            className="w-20"
            src={!image3 ? images.UpImage : URL.createObjectURL(image3)}
            alt=""
          />
          <input
            onChange={(e) => setImage3(e.target.files[0])}
            className="w-20"
            type="file"
            id="image3"
          />
        </label>
        <label htmlFor="image4">
          <img
            className="w-20"
            src={!image4 ? images.UpImage : URL.createObjectURL(image4)}
            alt=""
          />
          <input
            onChange={(e) => setImage4(e.target.files[0])}
            className="w-20"
            type="file"
            id="image4"
          />
        </label>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
        />{' '}
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
        />{' '}
      </div>
      <div className="flex felx-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name=""
            id=""
            className="w-full px-3  py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="">
          <p className="mb-2">Product Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            name=""
            id=""
            className="w-full px-3  py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Botttomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>
      <div className="">
        <p className="mb-2">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full px-3 py-2 sm:w-[120px]"
          type="number"
          placeholder="25"
        />
      </div>
      <div className="">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
            <div
              key={sizeOption}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(sizeOption)
                    ? prev.filter((item) => item !== sizeOption)
                    : [...prev, sizeOption]
                )
              }
              className={`px-3 py-1 cursor-pointer ${
                size.includes(sizeOption) ? 'bg-pink-200' : 'bg-slate-200'
              }`}
            >
              <p>{sizeOption}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>
      <button
        type="submit"
        className="cursor-pointer w-28 py-3 mt-4 bg-black text-white"
      >
        ADD
      </button>
    </form>
  )
}

export default Add
