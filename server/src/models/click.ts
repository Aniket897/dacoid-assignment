import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Types.ObjectId,
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Click", clickSchema);
