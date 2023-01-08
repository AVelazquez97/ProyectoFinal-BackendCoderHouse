import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ordersSchema = Schema({
  clientEmail: { type: String, required: true },
  clientAddress: { type: String, required: true },
  status: { type: String, enum: ['Generada', 'Enviada'], default: 'Generada' },
  timestamp: { type: Date, default: Date.now, trim: true },
  products: [
    {
      name: String,
      description: String,
      code: String,
      thumbnail: String,
      price: Number,
      quantity: Number,
    },
  ],
});

ordersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Orders', ordersSchema);
