const express = require("express");
const os = require("os");

const router = express.Router();

router.get("/", (req, res) => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    res.json({
        platform: process.platform,
        architecture: process.arch,
        node: process.version,
        hostname: os.hostname(),
        cpu: os.cpus().length,
        memory: {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory,
            usagePercent: Number(
                ((usedMemory / totalMemory) * 100).toFixed(2)
            )
        },
        uptime: process.uptime()
    });
});

router.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        server: "online",
        timestamp: new Date().toISOString()
    });
});

module.exports = router;