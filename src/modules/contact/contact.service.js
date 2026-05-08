// ===================== import modules =====================
import { contactModel } from "../../database/models/contact.model.js";

// ==================== 1) Create Contact ====================
export const createContact = async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const contact = await contactModel.create({ name, email, phone, message });
  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    contact,
  });
};

// ==================== 2) Get All Contacts ====================
export const getAllContacts = async (req, res, next) => {
  const contacts = await contactModel.find().sort({ createdAt: -1 });
  return res.status(200).json({ success: true, data: contacts });
};

// ==================== 3) Mark as Read ====================
export const markAsRead = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactModel.findById(id);
  if (!contact) {
    return next(new Error("Contact message not found", { cause: 404 }));
  }
  contact.isRead = true;
  await contact.save();
  return res.status(200).json({ success: true, message: "Marked as read", contact });
};

// ==================== 4) Delete Contact ====================
export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactModel.findById(id);
  if (!contact) {
    return next(new Error("Contact message not found", { cause: 404 }));
  }
  await contact.deleteOne();
  return res.status(200).json({ success: true, message: "Contact deleted successfully" });
};
