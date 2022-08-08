import mongoose from 'mongoose'

const Log = new mongoose.Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "Login",
  },
  type: {
    type: String,
    required: true
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Job",
  },
  action: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Log', Log)