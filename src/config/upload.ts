import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
    limits: { fileSize: 20000 };
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucketProfileAvatar: string;
      bucketAdvertImages: string;
      bucketAdvertImagesInBody: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucketProfileAvatar: process.env.AWS_BUCKET_PROFILE_AVATAR,
      bucketAdvertImages: process.env.AWS_BUCKET_ADVERT_IMAGES,
      bucketAdvertImagesInBody: process.env.AWS_BUCKET_ADVERT_IMAGES_IN_BODY,
    },
  },
} as IUploadConfig;
