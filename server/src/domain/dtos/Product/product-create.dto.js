import { ProductModel } from "../../../models/Product.js";

export class CreateProductDto {
  constructor(productName, price, quantity, isAvaliable, categoryId, userId){
    this.productName = productName
    this.price = price
    this.quantity = quantity
    this.categoryId = categoryId
    this.userId = userId
    this.isAvaliable = isAvaliable
  }

  static async createProduct(props){
    const { productName, price, quantity, user,isAvaliable = false } = props
    const existingProduct = await ProductModel.countDocuments({
      productName
    })
    if(!!existingProduct) return ['PRODUCT_ALREADY_EXIST']
    if(!productName) return ['REQUIRED_FIELD']
    // if(!categoryId) return ['REQUIRED_FIELD']
    if(!user) return ['REQUIRED_FIELD']
    if (!user.role.includes('ADMIN_ROLE')) return ['UNAUTHORIZED_USER']
    if(!quantity) return ['REQUIRED_FIELD']
    if(!price) return ['REQUIRED_FIELD']
    let available
    if (typeof isAvaliable === 'string') {
      available =
        isAvaliable === 'true' ? true : isAvaliable === 'false' ? false : null
    }

    return [undefined, new CreateProductDto(productName, parseFloat(price), parseInt(quantity), available, user._id )]
  }
  static async updateProduct(props){
    const { productName, price, quantity, user, isAvaliable } = props
    if (!user.role.includes('ADMIN_ROLE')) return ['UNAUTHORIZED_USER']
    return [undefined, new CreateProductDto(productName, price, quantity, isAvaliable , user)]
  }
}