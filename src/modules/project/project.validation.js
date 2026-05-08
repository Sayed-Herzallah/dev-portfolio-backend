// =================================== Validation Schema — Project ===================================
import joi from "joi";
import { monggoseID } from "../../middleware/validation.middleware.js";

// ==================== Project ID Schema ====================
export const projectIdSchema = joi.object({
  id: monggoseID("Project ID").required(),
});

// ==================== 1) Create Project ====================
export const createProjectSchema = joi.object({
  title: joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title is required",
  }),
  type: joi
    .string()
    .valid("experience", "additional", "wordpress")
    .required()
    .messages({
      "any.required": "Type is required",
      "any.only":     "Type must be experience, additional, or wordpress",
    }),
  role:            joi.string().trim().allow("", null),
  overview:        joi.string().trim().allow("", null),
  overviewLabel:   joi.string().trim().allow("", null),
  detailsLabel:    joi.string().trim().allow("", null),
  details:         joi.string().trim().allow("", null),
  summaryLabel:    joi.string().trim().allow("", null),
  summary:         joi.string().trim().allow("", null),
  listTitle:       joi.string().trim().allow("", null),
  listItems:       joi.array().items(joi.string().trim()).allow(null),
  outro:           joi.string().trim().allow("", null),
  project:         joi.string().trim().allow("", null),
  link:            joi.string().trim().uri().allow("", null).messages({
    "string.uri": "Link must be a valid URL",
  }),
  mediaKind:       joi.string().valid("single", "images", "none").default("none"),
  backgroundClass: joi.string().trim().allow("", null),
  order:           joi.number().integer().allow(null),
  isVisible:       joi.boolean().allow(null),
  file:            joi.any(),
});

// ==================== 2) Update Project ====================
export const updateProjectSchema = joi.object({
  id:              monggoseID("Project ID").required(),
  title:           joi.string().trim(),
  type:            joi.string().valid("experience", "additional", "wordpress"),
  role:            joi.string().trim().allow("", null),
  overview:        joi.string().trim().allow("", null),
  overviewLabel:   joi.string().trim().allow("", null),
  detailsLabel:    joi.string().trim().allow("", null),
  details:         joi.string().trim().allow("", null),
  summaryLabel:    joi.string().trim().allow("", null),
  summary:         joi.string().trim().allow("", null),
  listTitle:       joi.string().trim().allow("", null),
  listItems:       joi.array().items(joi.string().trim()).allow(null),
  outro:           joi.string().trim().allow("", null),
  project:         joi.string().trim().allow("", null),
  link:            joi.string().trim().uri().allow("", null).messages({
    "string.uri": "Link must be a valid URL",
  }),
  mediaKind:       joi.string().valid("single", "images", "none"),
  backgroundClass: joi.string().trim().allow("", null),
  order:           joi.number().integer().allow(null),
  isVisible:       joi.boolean().allow(null),
  deleteImages:    joi.array().items(joi.string()).allow(null),
  file:            joi.any(),
}).min(2).messages({
  "object.missing": "At least one field must be provided",
});
