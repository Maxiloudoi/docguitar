require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./sequilize");
const port = 8080;
const cors = require("cors");

const users = require("./routes/user.route");
const userTypes = require("./routes/usertype.route");
const posts = require("./routes/post.route");
const activityFields = require("./routes/activityfields.route");
const router = require("./routes/auth.route");

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/posts", posts);
app.use("/usertypes", userTypes);
app.use("/users", users);
app.use("/activityfields", activityFields);
app.use("/auth", router);

app.get("/", (request, response) => {
    response.send("Bienvenue sur Doc'Guitare !");
});

sequelize
    .sync()
    .then(() => {
        return sequelize.authenticate();
    })
    .then(() => {
        app.listen(port, (err) => {
            if (err) {
                throw new Error("Something bad happened...");
            }
            console.log(`Server is listening on ${port}`);
        });
    })
    .catch((err) => {
        console.log("enable to join database", err.message);
    });
