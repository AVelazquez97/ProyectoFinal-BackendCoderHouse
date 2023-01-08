class CartDTO {
  constructor({ id, timestamp, products, clientId }) {
    this.id = id;
    this.timestamp = timestamp;
    this.products = products;
    this.clientId = clientId;
  }

  #toJSON = () => {
    return {
      id: this.id,
      timestamp: this.timestamp,
      products: this.products,
      clientId: this.clientId,
    };
  };

  static toDTO = (orders) => {
    if (Array.isArray(orders)) {
      return orders.map((order) => new CartDTO(order).#toJSON());
    } else return new CartDTO(orders);
  };
}

export default CartDTO;
