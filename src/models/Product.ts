import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
  },
  { timestamps: true }
);

// ✅ SAFE SERIALIZATION
productSchema.set("toJSON", {
  transform: function (_doc, ret) {
    return {
      id: ret._id,
      name: ret.name,
      price: ret.price,
      description: ret.description,
      categoryId: ret.categoryId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt
    };
  }
});

export const Product = mongoose.model("Product", productSchema);