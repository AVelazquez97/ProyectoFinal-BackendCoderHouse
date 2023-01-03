import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
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

export default mongoose.model('Messages', messagesSchema);
