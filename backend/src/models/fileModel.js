import mongoose from "mongoose";

/**
 * Mongoose schema and model for file metadata.
 * Stores details like:
 *  - filename (stored name)
 *  - originalName (user-uploaded name)
 *  - mimeType
 *  - size
 *  - path (storage path on server)
 *  - createdAt (upload timestamp)
 * 
 * This data is stored in MongoDB and referenced in fileController.
 */

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  path: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});


const File = mongoose.model("File", fileSchema);

export default File;
