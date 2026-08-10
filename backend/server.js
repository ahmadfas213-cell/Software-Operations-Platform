const express = require("express");
const path = require("path");
require("dotenv").config();

const projectsRoutes = require("./routes/projects");
const logsRoutes = require("./routes/logs");
const monitoringRoutes = require("./routes/monitoring");
const toolsRoutes = require("./routes/tools");

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(
    path.join(__dirname, "../frontend")
));


app.get("/health", (req, res) => {

    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });

});


app.use(
    "/api/projects",
    projectsRoutes
);


app.use(
    "/api/logs",
    logsRoutes
);


app.use(
    "/api/monitoring",
    monitoringRoutes
);


app.use(
    "/api/tools",
    toolsRoutes
);


app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});


app.use((req, res) => {

    res.status(404).json({
        error: "Endpoint not found"
    });

});


app.listen(PORT, () => {

    console.log(
        "◇ SOFTWARE OPERATIONS PLATFORM"
    );

    console.log(
        `Server: http://localhost:${PORT}`
    );

    console.log(
        `Health: http://localhost:${PORT}/health`
    );

});