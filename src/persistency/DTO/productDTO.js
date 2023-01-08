class ProductDTO {
  constructor({
    id,
    timestamp,
    name,
    category,
    description,
    code,
    thumbnail,
    price,
    stock,
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.name = name;
    this.category = category;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
  }

  #toJSON = () => {
    return {
      id: this.id,
      timestamp: this.timestamp,
      name: this.name,
      category: this.category,
      description: this.description,
      code: this.code,
      thumbnail: this.thumbnail,
      price: this.price,
      stock: this.stock,
    };
  };

  static toDTO = (products) => {
    if (Array.isArray(products)) {
      return products.map((product) => new ProductDTO(product).#toJSON());
    } else return new ProductDTO(products);
  };
}

export default ProductDTO;
