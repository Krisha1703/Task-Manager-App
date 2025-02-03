import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  tags: String,
  comments: String,
  assignee: String,
  reminder: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
