import { cloudinary } from "../config/cloudinary.js";

const slugify = (text) => text?.toString().toLowerCase().trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-') || 'unnamed';

const mediaController = {
    /**
     * Generates a signature for Cloudinary Signed Uploads
     * Enforces the folder structure: turfing-box/{type}/{name}/{subType}
     */
    async getUploadSignature(req, res) {
        try {
            const { type, name, subType, tags } = req.query;
            const timestamp = Math.round(new Date().getTime() / 1000);
            
            // Build standardized folder path
            let folderPath = 'turfing-box/others';
            if (type && name) {
                const entityName = slugify(name);
                if (type === 'turf') {
                    const sub = subType || 'others';
                    if (sub === 'logo') folderPath = `turfing-box/turfs/${entityName}/logo`;
                    else if (sub === 'gallery') folderPath = `turfing-box/turfs/${entityName}/gallery`;
                    else if (sub === 'docs') folderPath = `turfing-box/turfs/${entityName}/docs`;
                    else if (sub.startsWith('court_')) folderPath = `turfing-box/turfs/${entityName}/courts/${sub}`;
                    else folderPath = `turfing-box/turfs/${entityName}/${sub}`;
                } else if (type === 'profile') {
                    folderPath = `turfing-box/profiles/${entityName}`;
                } else if (type === 'club') {
                    folderPath = `turfing-box/clubs/${entityName}`;
                }
            }

            const paramsToSign = {
                timestamp,
                folder: folderPath,
                source: 'uw',
            };


            if (tags) paramsToSign.tags = tags;

            // Generate the signature using the API Secret
            const signature = cloudinary.utils.api_sign_request(
                paramsToSign,
                process.env.CLOUDINARY_API_SECRET
            );

            return res.status(200).json({
                code: 200,
                message: "Signature generated successfully",
                data: {
                    signature,
                    timestamp,
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    folder: paramsToSign.folder
                }
            });
        } catch (error) {
            console.error("Error generating Cloudinary signature:", error);
            return res.status(500).json({
                code: 500,
                message: "Internal Server Error during signature generation",
                data: []
            });
        }
    }
};

export default mediaController;
