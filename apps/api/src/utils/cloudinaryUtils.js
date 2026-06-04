import { cloudinary } from '../config/cloudinary.js';

const cloudinaryUtils = {
    /**
     * Extracts public IDs from Cloudinary URLs and deletes them.
     * @param {string[]} urls - Array of Cloudinary URLs to delete
     */
    async deleteFiles(urls) {
        if (!urls || urls.length === 0) return;

        try {
            const publicIds = urls.map(url => {
                // Example URL: https://res.cloudinary.com/demo/image/upload/v12345/turfing-box/turfs/my-turf/logo/abc.jpg
                // Public ID: turfing-box/turfs/my-turf/logo/abc
                const parts = url.split('/');
                const fileNameWithExt = parts.pop();
                const fileName = fileNameWithExt.split('.')[0];
                
                // Find where the project folder starts
                const folderIndex = parts.indexOf('turfing-box');
                if (folderIndex === -1) return null;
                
                const folderPath = parts.slice(folderIndex).join('/');
                return `${folderPath}/${fileName}`;
            }).filter(id => id !== null);

            if (publicIds.length === 0) return;

            console.log('Rolling back Cloudinary assets:', publicIds);

            // Cloudinary's api.delete_resources is better for multiple files
            // but requires Admin API. Using uploader.destroy in a loop for simpler setup.
            const deletePromises = publicIds.map(id => 
                cloudinary.uploader.destroy(id, { resource_type: 'auto' })
            );
            
            await Promise.all(deletePromises);
        } catch (error) {
            console.error('Error during Cloudinary rollback:', error);
        }
    }
};

export default cloudinaryUtils;
