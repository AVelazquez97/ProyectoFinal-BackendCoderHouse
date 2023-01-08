class OrderDTO {
  constructor({ id, clientEmail, clientAddress, status, timestamp, products }) {
    this.id = id;
    this.clientEmail = clientEmail;
    this.clientAddress = clientAddress;
    this.status = status;
    this.timestamp = timestamp;
    this.products = products;
  }

  #toJSON = () => {
    return {
      id: this.id,
      clientEmail: this.clientEmail,
      clientAddress: this.clientAddress,
      status: this.status,
      timestamp: this.timestamp,
      products: this.products,
    };
  };

  static toDTO = (orders) => {
    if (Array.isArray(orders)) {
      return orders.map((order) => new OrderDTO(order).#toJSON());
    } else return new OrderDTO(orders);
  };
}

export default OrderDTO;
