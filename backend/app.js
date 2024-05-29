require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const todoListRoutes = require("./routes/todoList");
const userRoutes = require("./routes/user");
const db = require("./models");
require("./config/passport/passport");

const PORT = process.env.PORT || 8000

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todo-list", todoListRoutes);
app.use("/users", userRoutes);

let isDatabaseConnected = false

async function connectToDatabase() {
  while (!isDatabaseConnected) {
    try {
      await db.sequelize.sync({ force: false });
      app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
      });
      isDatabaseConnected = true;
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectToDatabase();