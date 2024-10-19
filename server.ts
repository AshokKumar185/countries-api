import express, { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const DBconnect = require("./dbConfig/config");
const contryRoutes = require("./routes/countryRoutes");
const stateRoutes = require("./routes/stateRoute");
const districtRoutes = require("./routes/districtRoutes");
const talukRoutes = require("./routes/taulkRoute");
const firmRoutes = require("./routes/firmRotes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
const app = express();
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};
app.use(myMiddleware);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

DBconnect();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/country", contryRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/taluk", talukRoutes);
app.use("/api/Firm", firmRoutes);
app.use("/auth/user", userRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
