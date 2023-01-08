import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const productsSchema = new Schema({
  timestamp: { type: Date, default: Date.now, trim: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  thumbnail: { type: String, required: false, trim: true },
  price: { type: Number, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
});

productsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) { delete ret._id }
});

export default model('Products', productsSchema);
