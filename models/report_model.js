import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
  },
  initialCost: {
    type: String,
  },
  records: {
    type: [
      {
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        date: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        recordType: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

export default mongoose.model("reports", ReportSchema);
