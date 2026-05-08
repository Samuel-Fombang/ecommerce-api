import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

// ✅ SAFE SERIALIZATION
categorySchema.set("toJSON", {
  transform: function (_doc, ret) {
    return {
      id: ret._id,
      name: ret.name,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt
    };
  }
});

export const Category = mongoose.model("Category", categorySchema);