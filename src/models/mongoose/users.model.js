import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: false },
});

usersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('User', usersSchema);
