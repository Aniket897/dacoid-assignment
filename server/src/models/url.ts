import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "original url is required"],
    },
    shortId: {
      type: String,
      required: [true, "shortId is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Url", UrlSchema);
