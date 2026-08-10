const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        name: "Developer Tools",
        status: "ready",
        tools: [
            {
                id: "json-formatter",
                name: "JSON Formatter",
                endpoint: "/api/tools/json/format",
                method: "POST"
            },
            {
                id: "sql-analyzer",
                name: "SQL Analyzer",
                endpoint: "/api/tools/sql/analyze",
                method: "POST"
            }
        ]
    });
});


router.post("/json/format", (req, res) => {

    try {

        const { input } = req.body;

        if (!input) {
            return res.status(400).json({
                error: "JSON input is required"
            });
        }

        const parsed = JSON.parse(input);

        res.json({
            valid: true,
            formatted: JSON.stringify(
                parsed,
                null,
                4
            )
        });

    } catch (error) {

        res.status(400).json({
            valid: false,
            error: error.message
        });

    }

});


router.post("/sql/analyze", (req, res) => {

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({
            error: "SQL query is required"
        });
    }

    const normalized = query
        .trim()
        .replace(/\s+/g, " ");

    const upper =
        normalized.toUpperCase();

    let operation = "UNKNOWN";

    if (upper.startsWith("SELECT")) {
        operation = "SELECT";
    } else if (upper.startsWith("INSERT")) {
        operation = "INSERT";
    } else if (upper.startsWith("UPDATE")) {
        operation = "UPDATE";
    } else if (upper.startsWith("DELETE")) {
        operation = "DELETE";
    }

    res.json({
        query: normalized,
        operation,
        hasWhere: /\bWHERE\b/i.test(normalized),
        hasJoin: /\bJOIN\b/i.test(normalized),
        hasGroupBy: /\bGROUP\s+BY\b/i.test(normalized),
        hasOrderBy: /\bORDER\s+BY\b/i.test(normalized)
    });

});


module.exports = router;