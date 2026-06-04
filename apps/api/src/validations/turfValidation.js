import { z } from 'zod';

const turfRegistrationSchema = z.object({
    name: z.string().min(3).max(100),
    location: z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.object({
        type: z.literal('Point'),
        coordinates: z.array(z.number()).length(2)
    })),
    address: z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.object({
        line1: z.string().optional(),
        line2: z.string().optional(),
        city: z.string().min(2),
        state: z.string().optional(),
        pincode: z.string().optional(),
        mapLink: z.string().url().optional().or(z.literal(''))
    })),
    description: z.string().optional(),
    amenities: z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.array(z.string())),
    sports: z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.array(z.string())),
    gstin: z.string().optional(),
    panOwner: z.string().min(10).max(10), // Standard PAN length

    // Signed Upload Support: URLs can be passed directly in JSON
    logoUrl: z.string().url().optional(),
    images: z.array(z.string().url()).optional(),
    documents: z.array(z.string().url()).optional(),

    courts: z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.array(z.object({
        name: z.string().min(2),
        pricePerHour: z.number().positive(),
        sport: z.array(z.string()).min(1),
        surfaceType: z.string().optional(),
        description: z.string().optional(),
        images: z.array(z.string().url()).optional()
    })).min(1))

});

export { turfRegistrationSchema };
