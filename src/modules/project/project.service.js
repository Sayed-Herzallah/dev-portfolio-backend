// ===================== import modules =====================
import { projectModel }         from "../../database/models/project.model.js";
import { deleteFromCloudinary } from "../../utils/cloudinary/cloudinary.js";

// ==================== 1) Get All Projects ====================
export const getAllProjects = async (req, res, next) => {
  const projects = await projectModel
    .find({ isVisible: true })
    .sort({ order: 1, createdAt: 1 });
  return res.status(200).json({ success: true, data: projects });
};

// ==================== 2) Get Single Project ====================
export const getSingleProject = async (req, res, next) => {
  const { id } = req.params;
  const project = await projectModel.findById(id);
  if (!project) {
    return next(new Error("Project not found", { cause: 404 }));
  }
  return res.status(200).json({ success: true, project });
};

// ==================== 3) Create Project ====================
export const createProject = async (req, res, next) => {
  // parse listItems إذا جاءت كـ JSON string من form-data
  if (req.body.listItems && typeof req.body.listItems === "string") {
    try {
      req.body.listItems = JSON.parse(req.body.listItems);
    } catch {
      return next(new Error("Invalid listItems format", { cause: 400 }));
    }
  }

  // ارفع الصور المُرسَلة وحوّلها للـ format المطلوب
  const images = req.files?.map((file) => ({
    url:      file.path,
    publicId: file.filename,
  })) ?? [];

  const project = await projectModel.create({ ...req.body, images });
  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    project,
  });
};

// ==================== 4) Update Project ====================
export const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const project = await projectModel.findById(id);
  if (!project) {
    return next(new Error("Project not found", { cause: 404 }));
  }

  // parse listItems
  if (req.body.listItems && typeof req.body.listItems === "string") {
    try {
      req.body.listItems = JSON.parse(req.body.listItems);
    } catch { /* leave as is */ }
  }

  // حذف صور محددة من Cloudinary + من الـ array
  const toDelete = req.body.deleteImages
    ? (typeof req.body.deleteImages === "string"
        ? JSON.parse(req.body.deleteImages)
        : req.body.deleteImages)
    : [];

  if (toDelete.length > 0) {
    await Promise.all(toDelete.map((publicId) => deleteFromCloudinary(publicId)));
    project.images = project.images.filter(
      (img) => !toDelete.includes(img.publicId)
    );
  }

  // إضافة الصور الجديدة
  if (req.files?.length > 0) {
    const newImages = req.files.map((file) => ({
      url:      file.path,
      publicId: file.filename,
    }));
    project.images.push(...newImages);
  }

  // تحديث الحقول المسموح بها فقط
  const allowedFields = [
    "title", "type", "role", "overview", "overviewLabel",
    "detailsLabel", "details", "summaryLabel", "summary",
    "listTitle", "listItems", "outro", "project", "link",
    "mediaKind", "backgroundClass", "order", "isVisible",
  ];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) project[field] = req.body[field];
  });

  await project.save();
  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
};

// ==================== 5) Delete Project ====================
export const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const project = await projectModel.findById(id);
  if (!project) {
    return next(new Error("Project not found", { cause: 404 }));
  }

  // احذف كل الصور من Cloudinary أولاً
  if (project.images?.length > 0) {
    await Promise.all(
      project.images.map((img) => deleteFromCloudinary(img.publicId))
    );
  }

  await project.deleteOne();
  return res.status(200).json({ success: true, message: "Project deleted successfully" });
};
