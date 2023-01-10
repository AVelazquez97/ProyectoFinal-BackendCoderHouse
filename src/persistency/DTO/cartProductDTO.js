class CartProductDTO {
  constructor({
    _id,
    timestamp,
    name,
    category,
    description,
    code,
    thumbnail,
    price,
    quantity,
  }) {
    this.id = _id;
    this.timestamp = timestamp;
    this.name = name;
    this.category = category;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.quantity = quantity;
  }

  #toJSON = () => {
    return {
      _id: this.id,
      timestamp: this.timestamp,
      name: this.name,
      category: this.category,
      description: this.description,
      code: this.code,
      thumbnail: this.thumbnail,
      price: this.price,
      quantity: this.quantity,
    };
  };

  static toDTO = (cartProducts) => {
    if (Array.isArray(cartProducts)) {
      return cartProducts.map((product) => new CartProductDTO(product).#toJSON());
    } else return new CartProductDTO(cartProducts);
  };
}

export default CartProductDTO;
