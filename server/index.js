const express = require("express");
const app = express();
const port = 1920;
require("./db/conn");
const cors = require("cors");
const Router = require("./routes/route");

// middlewares

app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
