require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");

// extra security packs
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//connect DB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/auth");

//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const tripsRouter = require("./routes/trips");
const fetchPlacesRouter = require("./routes/fetchPlaces");
const meRouter = require("./routes/me");
const refreshTokenRouter = require("./routes/refreshToken");
const placesRouter = require("./routes/places");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 400,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const corsOptions = {
  origin: "https://tripzz-travel-planner.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(xss());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/trips", authenticateUser, tripsRouter);
app.use("/api/v1/fetchPlaces", authenticateUser, fetchPlacesRouter);
app.use("/api/v1/places", authenticateUser, placesRouter);
app.use("/api/v1/me", authenticateUser, meRouter);
app.use("/api/v1/refreshToken", authenticateUser, refreshTokenRouter);

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
