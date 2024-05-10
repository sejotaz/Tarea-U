export class ProductEntity{
  constructor(
    _id,
    productName,
    price,
    quantity,
    isAvaliable,
    categoryId,
    userId,
    isRemove,
  ){
    this._id = _id
    this.productName = productName
    this.quantity = quantity
    this.price = price
    this.isAvaliable = isAvaliable
    this.categoryId = categoryId
    this.userId = userId
    this.isRemove = isRemove
  }

  static fromObject(object){
    const { _id, productName, price, quantity, isAvaliable, userId  } = object
    if(!_id) throw new Error('ID_IS_REQUIRED')
    if(!productName) throw new Error('PRODUCT_NAME_IS_REQUIRED')
    if(!price) throw new Error('PRICES_IS_REQUIRED')
    if(typeof isAvaliable !== 'boolean') throw new Error('INCORRECT_DATA')
    // if(!userId) throw new Error('USER_IS_REQUIRED')
    if(!quantity) throw new Error('QUANTITY_IS_REQUIRED')
    return new ProductEntity(_id, productName, price, quantity, isAvaliable )
  }

}