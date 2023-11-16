import multer from "multer";
import express from "express";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;
  cloudinary.uploader.upload(imagePath, (result) => {
    const imageUrl = result.secure_url;
    res.send({ imageUrl });
  });
});

export default router;
