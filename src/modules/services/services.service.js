// ===================== import modules =====================
import { serviceModel }         from "../../database/models/services.model.js";
import { deleteFromCloudinary } from "../../utils/cloudinary/cloudinary.js";

// ==================== 1) Get All Services ====================
export const getAllServices = async (req, res, next) => {
  const services = await serviceModel
    .find({ isVisible: true })
    .sort({ order: 1, createdAt: 1 });
  return res.status(200).json({ success: true, data: services });
};

// ==================== 2) Get Single Service ====================
export const getSingleService = async (req, res, next) => {
  const { id } = req.params;
  const service = await serviceModel.findById(id);
  if (!service) {
    return next(new Error("Service not found", { cause: 404 }));
  }
  return res.status(200).json({ success: true, service });
};

// ==================== 3) Create Service ====================
export const createService = async (req, res, next) => {
  // parse items إذا جاءت كـ JSON string من form-data
  if (req.body.items && typeof req.body.items === "string") {
    try {
      req.body.items = JSON.parse(req.body.items);
    } catch {
      return next(new Error("Invalid items format", { cause: 400 }));
    }
  }

  const image = req.file
    ? { url: req.file.path, publicId: req.file.filename }
    : undefined;

  const service = await serviceModel.create({
    ...req.body,
    ...(image && { image }),
  });

  return res.status(201).json({
    success: true,
    message: "Service created successfully",
    service,
  });
};

// ==================== 4) Update Service ====================
export const updateService = async (req, res, next) => {
  const { id } = req.params;
  const service = await serviceModel.findById(id);
  if (!service) {
    return next(new Error("Service not found", { cause: 404 }));
  }

  // parse items إذا جاءت كـ JSON string
  if (req.body.items && typeof req.body.items === "string") {
    try {
      req.body.items = JSON.parse(req.body.items);
    } catch { /* leave as is */ }
  }

  // تحديث الصورة — احذف القديمة أولاً
  if (req.file) {
    if (service.image?.publicId) await deleteFromCloudinary(service.image.publicId);
    service.image = { url: req.file.path, publicId: req.file.filename };
  }

  // تحديث الحقول المسموح بها فقط
  const allowedFields = ["title", "items", "cta", "backgroundClass", "order", "isVisible"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) service[field] = req.body[field];
  });

  await service.save();
  return res.status(200).json({
    success: true,
    message: "Service updated successfully",
    service,
  });
};

// ==================== 5) Delete Service ====================
export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  const service = await serviceModel.findById(id);
  if (!service) {
    return next(new Error("Service not found", { cause: 404 }));
  }

  // احذف الصورة من Cloudinary قبل حذف السجل
  if (service.image?.publicId) await deleteFromCloudinary(service.image.publicId);
  await service.deleteOne();

  return res.status(200).json({ success: true, message: "Service deleted successfully" });
};
