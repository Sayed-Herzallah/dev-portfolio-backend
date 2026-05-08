// =================================== Validation Schema — Contact ===================================
import joi from "joi";
import { monggoseID } from "../../middleware/validation.middleware.js";

// ==================== Regex ====================
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|edu)$/;

// ==================== Contact ID Schema ====================
export const contactIdSchema = joi.object({
  id: monggoseID("Contact ID").required(),
});

// ==================== 1) Create Contact ====================
export const createContactSchema = joi.object({
  name: joi.string().trim().min(2).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
    "string.min":   "Name must be at least 2 characters",
  }),

  email: joi.string().pattern(emailRegex).lowercase().trim().required().messages({
    "any.required":       "Email is required",
    "string.empty":       "Email is required",
    "string.pattern.base": "Invalid email format",
  }),

  phone: joi.string().trim().allow("", null),

  message: joi.string().trim().min(5).required().messages({
    "any.required": "Message is required",
    "string.empty": "Message is required",
    "string.min":   "Message must be at least 5 characters",
  }),
});
