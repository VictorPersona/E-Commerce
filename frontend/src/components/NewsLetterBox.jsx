import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now and Get 20% off
      </p>
      <p className="text-grey-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illo
        voluptas corporis pariatur, laboriosam reprehenderit optio aut dolorum
        porro labore quos blanditiis, nisi aspernatur quam iure magni eligendi
        animi sapiente.
      </p>
      <form
      onSubmit={onSubmitHandler}
        action=""
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetterBox
