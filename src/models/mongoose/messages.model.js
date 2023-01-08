import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messagesSchema = new Schema({
  email: { type: String, required: true, trim: true },
  msgType: { type: String, required: true, trim: true },
  msg: { type: String, required: true, trim: true },
  fyh: { type: Date, default: Date.now, trim: true },
});

messagesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Messages', messagesSchema);
