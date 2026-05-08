// ===================== import modules =====================
import connectDB      from "./src/database/connect.js";
import { notFoundHandler } from "./src/utils/errorhandling/notfoundhandler.js";
import { globalErrorHandler } from "./src/utils/errorhandling/globalhandler.js";
import projectRouter  from "./src/modules/project/project.controller.js";
import aboutRouter    from "./src/modules/about/about.controller.js";
import contactRouter  from "./src/modules/contact/contact.controller.js";
import servicesRouter from "./src/modules/services/services.controller.js";
import cors from "cors";

export const bootstrap = async (app, express) => {
  // ================= CORS ===================
  app.use(
    cors({
      origin: "*"
    })
  );

  // ================= connect to database ===================
  await connectDB();

  // ========================= parse body =========================
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ============================ Routes ============================
  app.use("/projects",  projectRouter);
  app.use("/about",     aboutRouter);
  app.use("/contact",   contactRouter);
  app.use("/services",  servicesRouter);

  // ======================= Error Handlers ============================
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
};
