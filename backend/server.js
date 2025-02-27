const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const noteRouter = require("./routes/notes");
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Example app listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
