import cors, { CorsOptions } from "cors";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const corsOptions: CorsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

export const corsMiddleware = () => cors(corsOptions);
