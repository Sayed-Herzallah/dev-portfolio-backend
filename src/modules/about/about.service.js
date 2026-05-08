// ===================== import modules =====================
import { aboutModel }           from "../../database/models/about.model.js";
import { deleteFromCloudinary } from "../../utils/cloudinary/cloudinary.js";

// ==================== 1) Get About ====================
export const getAbout = async (req, res, next) => {
  // يرجع السجل الوحيد أو ينشئ default إن لم يوجد
  let about = await aboutModel.findOne();
  if (!about) {
    about = await aboutModel.create({
      paragraphs: [
        "I'm a passionate UI/UX Designer with a solid foundation in Computer and Information Sciences from Mansoura University (Very Good grade). My journey in design is driven by a commitment to creating user-centered solutions that combine aesthetics with functionality.",
        "My Approach: I focus on understanding user needs through research, validating ideas with prototyping, and collaborating closely with developers to bring designs to life. Every design decision is intentional and backed by user insights.",
      ],
    });
  }
  return res.status(200).json({ success: true, about });
};

// ==================== 2) Update About ====================
export const updateAbout = async (req, res, next) => {
  let about = await aboutModel.findOne();
  if (!about) about = new aboutModel({});

  // parse paragraphs إذا جاءت كـ JSON string من form-data
  if (req.body.paragraphs && typeof req.body.paragraphs === "string") {
    try {
      req.body.paragraphs = JSON.parse(req.body.paragraphs);
    } catch {
      return next(new Error("Invalid paragraphs format", { cause: 400 }));
    }
  }

  // معالجة الصورة — احذف القديمة وارفع الجديدة
  if (req.file) {
    if (about.image?.publicId) await deleteFromCloudinary(about.image.publicId);
    about.image = { url: req.file.path, publicId: req.file.filename };
  }

  // تحديث الحقول المسموح بها فقط
  const allowedFields = ["paragraphs", "name", "university", "grade"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) about[field] = req.body[field];
  });

  await about.save();
  return res.status(200).json({ success: true, message: "About updated successfully", about });
};
