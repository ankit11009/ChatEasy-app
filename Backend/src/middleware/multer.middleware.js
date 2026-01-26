import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/temp")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});
// File Filter: Security check to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

 const upload = multer({ 
    storage,
    fileFilter,
    limits: {
    fileSize: 5 * 1024 * 1024, // Limit files to 5MB
  }
}) 
export {upload}