const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieSession = require("cookie-session");

// Data base
const sequelize_fixtures = require("sequelize-fixtures");
const db = require("./models");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("== Data Base Loaded");
    // Import test data
    //
    sequelize_fixtures
      .loadFiles(
        [
          "fixtures/user.json",
          "fixtures/client.json",
          "fixtures/project.json",
          "fixtures/task.json",
        ],
        db
      )
      .then(function () {
        console.log("== Test Data Loaded");
      });

    // Controllers
    const UserController = require("./controllers/userController");
    const userController = new UserController(db.client, db.user);

    const ClientController = require("./controllers/clientController");
    const clientController = new ClientController(db.client, db.project);

    const ProjectController = require("./controllers/projectController");
    const projectController = new ProjectController(db.project);

    const TaskController = require("./controllers/taskController");
    const taskController = new TaskController(db.task);

    const routes = require("./routes");
    const { response } = require("express");

    const app = express();
    const port = 3000;

    app.set("trust proxy", 1);

    app.use(
      cookieSession({
        name: "session",
        keys: ["premièreclefsecretecryptée", "secondeclefsecretecryptée"],
      })
    );

    app.set("views", path.join(__dirname, "./views"));
    app.set("view engine", "ejs");

    // Parseur JSON pour recevoir les données de requêtes
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());

    //sécurité cors abaissée//
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });

    app.use(express.static(path.join(__dirname, "./Theme")));
    fs.readFile(
      path.join(__dirname, "./config/params.json"),
      "utf-8",
      (err, data) => {
        if (err) {
          console.error(
            `Error Reading Parameters File ${err} - Using Default Options`
          );
          app.locals.siteName = "Freelance Planificator";
          app.locals.clientLabel = "Client";
          app.locals.projectLabel = "Project";
          app.locals.taskLabel = "Task";
        } else {
          app.locals.siteName = JSON.parse(data).name;
          app.locals.clientLabel = JSON.parse(data).labels["Client"];
          app.locals.projectLabel = JSON.parse(data).labels["Project"];
          app.locals.taskLabel = JSON.parse(data).labels["Task"];
        }
      }
    );

    app.use(
      "/",
      routes({
        db,
        userController,
        clientController,
        projectController,
        taskController,
      })
    );

    app.listen(port, () => {
      console.log(`Le projet est démarré sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`*** Erreur :\n*** ${error}`);
  });
