import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, trim: true },
  carts: { type: mongoose.Schema.ObjectId, ref: 'Products' },
  stock: { type: Number, require: true },
});

cartsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) { delete ret._id }
});

export default mongoose.model('Carts', cartsSchema);
