import multer, { diskStorage } from "multer";

export const upload = multer({ storage: multer.diskStorage({})});
