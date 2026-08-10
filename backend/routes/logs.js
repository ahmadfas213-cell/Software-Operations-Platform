const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const limit = Math.min(
            Number(req.query.limit) || 50,
            200
        );

        const [logs] = await db.execute(
            `SELECT *
             FROM system_logs
             ORDER BY created_at DESC
             LIMIT ${limit}`
        );

        res.json(logs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch logs"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            level,
            service,
            message
        } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Log message is required"
            });
        }

        const [result] = await db.execute(
            `INSERT INTO system_logs
            (level, service, message)
            VALUES (?, ?, ?)`,
            [
                level || "INFO",
                service || "system",
                message
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message: "Log created"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create log"
        });
    }
});

module.exports = router;