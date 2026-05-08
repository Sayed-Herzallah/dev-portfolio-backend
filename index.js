// import "dotenv/config";
// import express from "express";
// import { bootstrap } from "./app.controller.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// bootstrap(app, express).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} ✅`);
//   });
// });
// import express from "express";
// import { bootstrap } from "./app.controller.js";

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "API is running 🚀" });
// });

// await bootstrap(app, express);

// export default app;


import express from "express";
import { bootstrap } from "../app.controller.js";

let app; // cache app instance (important for serverless)

export default async function handler(req, res) {
  try {
    // create app once per cold start
    if (!app) {
      app = express();

      app.use(express.json());

      // مهم جدًا: bootstrap لازم يكون safe للserverless
      await bootstrap(app, express);
    }

    // تمرير request لـ Express
    return app(req, res);
  } catch (error) {
    console.error("Serverless Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}