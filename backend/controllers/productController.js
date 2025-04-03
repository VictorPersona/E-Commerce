import cloudinary from 'cloudinary'
import productModel from '../models/productModel.js'

//Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    )

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: `image`,
        })
        return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [], 
      bestSeller: bestSeller === 'true', 
      date: Date.now(),
      image: imageUrl,
    }

    const product = new productModel(productData)

    await product.save()

    res.json({
      success: true,
      message: `Product created with id ${product.id}`,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Add Product not working',
      error: error,
    })
  }
}

//List Product
export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({
      success: true,
      message: 'Products displayed successfuly',
      products,
    })
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error in listing products",error:error})
  }
}

//Remove Product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.json({
          success: false,
          message: 'Error in deleting product',
          error: error,
        })

    }
}

//Single Product
export const singleProduct = async (req, res) => {
    try {
        const productId = req.body.id
        const product = productModel.findById(productId)
        res.json({success:true,message:"Product fetched successfully",product})
    } catch (error) {
         console.log(error)
         res.json({
           success: false,
           message: 'Error in fetching product',
           error: error,
         })
    }
}
