// ===================== import modules =====================
import { Router }             from "express";
import { asyncHandler }       from "../../utils/errorhandling/asynchandler.js";
import * as contactService    from "./contact.service.js";
import * as contactValidation from "./contact.validation.js";
import { validation }         from "../../middleware/validation.middleware.js";

// ===================== Contact Router =====================
const router = Router();

// POST   /contact       → createContact  (public — زوار الموقع بيبعتوا رسالة)
router.post(
  "/",
  validation(contactValidation.createContactSchema),
  asyncHandler(contactService.createContact)
);

// GET    /contact       → getAllContacts  (admin)
router.get("/", asyncHandler(contactService.getAllContacts));

// PATCH  /contact/:id   → markAsRead     (admin)
router.patch(
  "/:id",
  validation(contactValidation.contactIdSchema),
  asyncHandler(contactService.markAsRead)
);

// DELETE /contact/:id   → deleteContact  (admin)
router.delete(
  "/:id",
  validation(contactValidation.contactIdSchema),
  asyncHandler(contactService.deleteContact)
);

export default router;
