import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Todo title is required"],
      maxLength: [15, "Maximum todo title is 15 characters"], 
    },
    text: {
      type: String,
      trim: true,
      required: [true, "Todo text is required"],
      minLength: [10, "Minimum todo text is 10 characters"], 
      maxLength: [50, "Maximum todo text is 50 characters"]
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);