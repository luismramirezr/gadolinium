import multer from 'multer';

import multerConfig from 'config/multer';

const uploadFileMiddleware = multer(multerConfig);

export default uploadFileMiddleware;
