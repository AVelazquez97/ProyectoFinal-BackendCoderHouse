class UserDTO {
  constructor({ id, email, password, fullName, age, phone, address, photo }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.age = age;
    this.phone = phone;
    this.address = address;
    this.photo = photo;
  }

  #toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      age: this.age,
      phone: this.phone,
      address: this.address,
      photo: this.photo,
    };
  };

  static toDTO = (users) => {
    if (Array.isArray(users)) {
      return users.map((user) => new UserDTO(user).#toJSON());
    } else return new UserDTO(users);
  };
}

export default UserDTO;
