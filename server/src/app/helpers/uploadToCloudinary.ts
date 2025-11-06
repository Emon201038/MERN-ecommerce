import { UploadApiResponse } from "cloudinary";
import { createReadStream } from "streamifier";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    );

    // Stream the buffer to Cloudinary
    createReadStream(fileBuffer).pipe(uploadStream);
  });
};
