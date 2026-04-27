import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
      index: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    subject: {
      type: String,
      required: true,
      enum: ["maths", "science", "english", "history", "computer", "other"],
      index: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
      enum: ["jpg", "png", "gif"],
    },

    fileSize: {
      type: Number,
      required: true,
      max: 10 * 1024 * 1024, 
    },

    mimeType: {
      type: String,
      default: null,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "pending", "approved", "rejected"],
      default: "uploaded",
      index: true,
    },

    rejectionReason: {
      type: String,
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    schedule: {
      startTime: {
        type: Date,
        default: null,
      },

      endTime: {
        type: Date,
        default: null,
      },

      rotationDuration: {
        type: Number,
        default: 5, 
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },

    analytics: {
      views: {
        type: Number,
        default: 0,
      },
      lastViewedAt: {
        type: Date,
        default: null,
      },
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const contentModel = mongoose.model("content", contentSchema)
export default contentModel