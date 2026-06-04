import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const slugify = (text) => text?.toString().toLowerCase().trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-') || 'unnamed';

const createStorage = (feature) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req, file) => {
        const fieldName = file.fieldname;
        
        if (feature === 'turfs') {
          const turfName = slugify(req.body.name);
          if (fieldName === 'logo') return `turfing-box/turfs/${turfName}/logo`;
          if (fieldName === 'images') return `turfing-box/turfs/${turfName}/gallery`;
          if (fieldName === 'documents') return `turfing-box/turfs/${turfName}/docs`;
          if (fieldName.startsWith('court_')) {
              const courtIndex = fieldName.split('_')[1];
              return `turfing-box/turfs/${turfName}/courts/court_${courtIndex}`;
          }
          return `turfing-box/turfs/${turfName}/others`;
        }

        if (feature === 'profiles') {
          const userName = slugify(req.body.name || req.user?.userId);
          return `turfing-box/profiles/${userName}`;
        }

        if (feature === 'clubs') {
          const clubName = slugify(req.body.name);
          return `turfing-box/clubs/${clubName}`;
        }

        return `turfing-box/${feature}`;
      },
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'mp4', 'mov', 'avi'],
      transformation: (req, file) => {
        if (file.mimetype.startsWith('image/')) {
          return [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }];
        }
        return [];
      },
    },
  });
};


const turfUpload = multer({ storage: createStorage('turfs') });
const clubUpload = multer({ storage: createStorage('clubs') });
const profileUpload = multer({ storage: createStorage('profiles') });


export {
  cloudinary,
  turfUpload,
  clubUpload,
  profileUpload
};
