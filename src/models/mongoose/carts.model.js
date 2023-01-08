import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const cartsSchema = new Schema({
  timestamp: { type: Date, default: Date.now, trim: true },
  products: { type: Array, require: true, defaultValue: [] },
  clientId: {type: Types.ObjectId, require: true }
});

cartsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Carts', cartsSchema);
