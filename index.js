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
import { bootstrap } from "./app.controller.js";

let app;

const createApp = async () => {
  const expressApp = express();

  expressApp.use(express.json());

  // health check (مهم جدًا للتأكد إن السيرفر شغال)
  expressApp.get("/", (req, res) => {
    res.json({ message: "API is running 🚀" });
  });

  await bootstrap(expressApp, express);

  return expressApp;
};

export default async function handler(req, res) {
  try {
    if (!app) {
      app = await createApp();
    }

    return app(req, res);
  } catch (error) {
    console.error("❌ Serverless Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}