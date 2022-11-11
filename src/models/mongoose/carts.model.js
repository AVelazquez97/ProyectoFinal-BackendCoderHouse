import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, trim: true },
  products: { type: Array, require: true, defaultValue: [] },
});

cartsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model('Carts', cartsSchema);
