import mongoose from "mongoose";
import turfService from "../services/turfService.js";
import courtService from "../services/courtService.js";
import cloudinaryUtils from "../utils/cloudinaryUtils.js";
import { turfRegistrationSchema } from "../validations/turfValidation.js";

const turfController = {
    async createTurf(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();

        // Collect all file URLs for potential rollback
        const allUploadedUrls = [];
        if (req.files) {
            Object.values(req.files).flat().forEach(file => allUploadedUrls.push(file.path));
        }

        try {
            // 1. Validation
            const validationResult = turfRegistrationSchema.safeParse(req.body);
            if (!validationResult.success) {
                // ... cleanup logic
                await cloudinaryUtils.deleteFiles(allUploadedUrls);
                return res.status(400).json({
                    code: 400,
                    message: "Validation Error",
                    errors: validationResult.error.errors,
                    data: []
                });
            }

            const { 
                name, location, address, description, 
                amenities, courts, sports, gstin, panOwner,
                logoUrl: bodyLogoUrl, images: bodyImages, documents: bodyDocuments
            } = validationResult.data;
            const { userId } = req.user;

            // 2. Uniqueness Check
            try {
                const existingTurf = await turfService.findTurfByNameAndCity(name, address.city);
                if (existingTurf) {
                    await cloudinaryUtils.deleteFiles(allUploadedUrls);
                    return res.status(400).json({
                        code: 400,
                        message: `A turf with the name "${name}" already exists in ${address.city}`,
                        data: []
                    });
                }
            } catch (err) {
                // If service throws "not found", we can proceed
            }

            // 3. Merged File URLs (Multer + JSON Body)
            const finalLogoUrl = bodyLogoUrl || req.files?.['logo']?.[0]?.path || null;
            const finalImages = [...(bodyImages || []), ...(req.files?.['images']?.map(file => file.path) || [])];
            const finalDocPaths = [...(bodyDocuments || []), ...(req.files?.['documents']?.map(file => file.path) || [])];

            // 4. Create the Turf
            const newTurf = await turfService.createTurf({
                name,
                logoUrl: finalLogoUrl,
                location,
                address,
                description,
                amenities,
                owner: userId,
                sports,
                gstin,
                panOwner,
                verificationStatus: 'pending',
                isActive: false,
                images: finalImages,
                documents: finalDocPaths
            }, session);


            // 4. Create Courts
            const createdCourts = [];
            for (let i = 0; i < courts.length; i++) {
                const court = courts[i];
                const courtFiles = req.files?.[`court_${i}_images`] || [];
                const uploadedImages = courtFiles.map(file => file.path);
                
                // Note: validator already ensures at least one image if we logic it correctly,
                // but here we check the final count including files.
                if (uploadedImages.length === 0 && (!court.images || court.images.length === 0)) {
                    throw new Error(`Court "${court.name}" must have at least one image.`);
                }

                const newCourt = await courtService.createCourt({
                    ...court,
                    turf: newTurf._id,
                    images: [...(court.images || []), ...uploadedImages]
                }, session);
                createdCourts.push(newCourt);
            }

            // 5. Update Turf with court IDs
            newTurf.courts = createdCourts.map(c => c._id);
            await newTurf.save({ session });

            await session.commitTransaction();

            return res.status(201).json({
                code: 201,
                message: "Turf registration submitted successfully.",
                data: newTurf
            });

        } catch (error) {
            await session.abortTransaction();
            console.error("Error in createTurf registration flow:", error.message);
            
            // Critical: Cleanup Cloudinary Assets
            await cloudinaryUtils.deleteFiles(allUploadedUrls);

            return res.status(error.message.includes('must have at least one image') ? 400 : 500).json({
                code: error.message.includes('must have at least one image') ? 400 : 500,
                message: error.message || "Internal Server Error during registration",
                data: []
            });
        } finally {
            session.endSession();
        }
    },

    async findTurfByOwner(req, res) {
        try {
            const { userId } = req.user;
            const turf = await turfService.findTurfByOwner(userId);
            if (!turf || turf.length === 0) {
                return res.status(404).json({ code: 404, message: "Turf not found", data: [] });
            }
            return res.status(200).json({ code: 200, message: "Turf found successfully", data: turf });
        } catch (error) {
            return res.status(500).json({ code: 500, message: "Internal Server Error", data: [] });
        }
    },

    async findTurfById(req, res) {
        try {
            const { turfId } = req.params;
            const turf = await turfService.findTurfById(turfId);
            return res.status(200).json({ code: 200, message: "Turf found successfully", data: turf });
        } catch (error) {
            return res.status(404).json({ code: 404, message: error.message, data: [] });
        }
    },

    async updateTurf(req, res) {
        try {
            const { turfId } = req.params;
            const turf = await turfService.updateTurf(turfId, req.body);
            return res.status(200).json({ code: 200, message: "Turf updated successfully", data: [turf] });
        } catch (error) {
            return res.status(500).json({ code: 500, message: "Internal Server Error", data: [] });
        }
    },

    async deleteTurf(req, res) {
        try {
            const { turfId } = req.params;
            const turf = await turfService.deleteTurf(turfId);
            return res.status(200).json({ code: 200, message: "Turf deleted successfully", data: turf });
        } catch (error) {
            return res.status(500).json({ code: 500, message: "Internal Server Error", data: [] });
        }
    }
};

export default turfController;
