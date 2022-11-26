import mongoose from 'mongoose';

const ordersSchema = mongoose.Schema({
  products: [
    {
      code: String,
      name: String,
      description: String,
      price: Number,
      thumbnail: String,
      stock: Number,
    },
  ],
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Generada', 'Enviada'], default: 'Generada' },
  timestamp: { type: Date, default: Date.now },
});

ordersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model('Orders', ordersSchema);
