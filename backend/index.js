require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");

// Extra security packs
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// Connect DB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/auth");

// Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const tripsRouter = require("./routes/trips");
const fetchPlacesRouter = require("./routes/fetchPlaces");
const meRouter = require("./routes/me");
const refreshTokenRouter = require("./routes/refreshToken");
const placesRouter = require("./routes/places");

// Error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// CORS options
const allowedOrigins = [
  "https://tripzz-travel-planner.vercel.app/",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 400,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/trips", authenticateUser, tripsRouter);
app.use("/api/v1/fetchPlaces", authenticateUser, fetchPlacesRouter);
app.use("/api/v1/places", authenticateUser, placesRouter);
app.use("/api/v1/me", authenticateUser, meRouter);
app.use("/api/v1/refreshToken", authenticateUser, refreshTokenRouter);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
