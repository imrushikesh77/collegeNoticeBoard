const multer = require("multer");  

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `public/noticeFiles`);
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${file.originalname}`);
    },
  });
const upload = multer({ storage: storage });

module.exports = upload;