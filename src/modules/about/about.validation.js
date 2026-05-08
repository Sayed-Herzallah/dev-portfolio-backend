// =================================== Validation Schema — About ===================================
import joi from "joi";

// ==================== Update About ====================
export const updateAboutSchema = joi.object({
  paragraphs: joi.array().items(joi.string().trim()).min(1).messages({
    "array.min": "At least one paragraph is required",
  }),
  name:       joi.string().trim().allow("", null),
  university: joi.string().trim().allow("", null),
  grade:      joi.string().trim().allow("", null),
  file:       joi.any(),
}).min(1).messages({
  "object.missing": "At least one field must be provided",
});
