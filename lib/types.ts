import { z } from 'zod';

// Helper function to safely convert string/number to number
const safeNumber = z
  .union([z.string(), z.number()])
  .transform((val) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(num) ? 0 : num;
  });

// Helper function to safely convert string/number to nullable number
const safeNullableNumber = z
  .union([z.string(), z.number(), z.null()])
  .transform((val) => {
    if (val === null || val === undefined || val === '') return null;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(num) ? null : num;
  })
  .nullable();

// Service schema
const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Professional schema with resilient data types
const professionalSchema = z.object({
  id: z.string(),
  nif: z.string(),
  dateBirth: z.string(),
  favorite: z.boolean(),
  email: z.string().email(),
  name: z.string(),
  photo: z.string().url(),
  phoneNumber: z.string(),
  type: z.string(),
  workCardNumber: z.string(),
  // Handle yearsOfExperience as string or number, then transform to number or null
  yearsOfExperience: safeNullableNumber,
  // Make other numeric fields resilient too
  totalShiftsRejected: safeNumber,
  totalHoursFilled: safeNumber,
  totalHoursApplied: safeNumber,
  totalHoursCanceled: safeNumber,
  itCanBeEvaluated: z.boolean(),
  services: z.array(serviceSchema),
});

// API Response schema
const professionalsResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(professionalSchema),
});

// Export types
export type Service = z.infer<typeof serviceSchema>;
export type Professional = z.infer<typeof professionalSchema>;
export type ProfessionalsResponse = z.infer<typeof professionalsResponseSchema>;

// Export schemas for validation
export { 
  serviceSchema as ServiceSchema, 
  professionalSchema as ProfessionalSchema, 
  professionalsResponseSchema as ProfessionalsResponseSchema 
}; 