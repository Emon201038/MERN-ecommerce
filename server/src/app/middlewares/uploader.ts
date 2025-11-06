import multer from "multer";

const uploaderStorage = multer.memoryStorage();

export const uploader = multer({
  storage: uploaderStorage,
  limits: {
    fileSize: 20971520,
  },
});
