const express = require("express");
const db = require("../config/database");

const router = express.Router();


// GET ALL PROJECTS
router.get("/", async (req, res) => {
    try {
        const [projects] = await db.execute(
            "SELECT * FROM projects ORDER BY created_at DESC"
        );

        res.json(projects);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch projects"
        });
    }
});


// GET PROJECT BY ID
router.get("/:id", async (req, res) => {
    try {
        const [projects] = await db.execute(
            "SELECT * FROM projects WHERE id = ?",
            [req.params.id]
        );

        if (projects.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json(projects[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch project"
        });
    }
});


// CREATE PROJECT
router.post("/", async (req, res) => {
    try {
        const {
            name,
            description,
            status,
            technology
        } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Project name is required"
            });
        }

        const [result] = await db.execute(
            `INSERT INTO projects
            (name, description, status, technology)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                description || "",
                status || "active",
                technology || ""
            ]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            description: description || "",
            status: status || "active",
            technology: technology || ""
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create project"
        });
    }
});


// UPDATE PROJECT
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            description,
            status,
            technology
        } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Project name is required"
            });
        }

        const [result] = await db.execute(
            `UPDATE projects
             SET name = ?,
                 description = ?,
                 status = ?,
                 technology = ?
             WHERE id = ?`,
            [
                name,
                description || "",
                status || "active",
                technology || "",
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json({
            message: "Project updated successfully",
            id: Number(req.params.id),
            name,
            description: description || "",
            status: status || "active",
            technology: technology || ""
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update project"
        });
    }
});


// DELETE PROJECT
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.execute(
            "DELETE FROM projects WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete project"
        });
    }
});


module.exports = router;