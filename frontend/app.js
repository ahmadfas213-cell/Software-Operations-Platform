const API_URL = "";

const statusElement = document.getElementById("status");

const projectCount = document.getElementById("projectCount");
const monitoringCount = document.getElementById("monitoringCount");
const logCount = document.getElementById("logCount");
const toolCount = document.getElementById("toolCount");

const backendHealth = document.getElementById("backendHealth");
const uptimeElement = document.getElementById("uptime");
const lastCheck = document.getElementById("lastCheck");

const platformElement = document.getElementById("platform");
const nodeVersionElement = document.getElementById("nodeVersion");
const cpuCoresElement = document.getElementById("cpuCores");
const memoryUsageElement = document.getElementById("memoryUsage");

const recentLogs = document.getElementById("recentLogs");
const logCounter = document.getElementById("logCounter");

const projectsList = document.getElementById("projectsList");
const projectTotal = document.getElementById("projectTotal");

const projectModal = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm");

const projectId = document.getElementById("projectId");
const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const projectStatus = document.getElementById("projectStatus");
const projectTechnology = document.getElementById("projectTechnology");

const modalTitle = document.getElementById("modalTitle");

const addProjectButton =
    document.getElementById("addProjectButton");

const closeModal =
    document.getElementById("closeModal");

const cancelProject =
    document.getElementById("cancelProject");


async function fetchAPI(endpoint, options = {}) {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        options
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || `API error: ${response.status}`
        );
    }

    return data;
}


async function loadDashboard() {

    try {

        const [
            health,
            projects,
            logs,
            monitoring,
            tools
        ] = await Promise.all([
            fetchAPI("/health"),
            fetchAPI("/api/projects"),
            fetchAPI("/api/logs"),
            fetchAPI("/api/monitoring"),
            fetchAPI("/api/tools")
        ]);

        statusElement.textContent =
            "Backend connected";

        statusElement.style.color =
            "#4ade80";

        backendHealth.textContent =
            health.status === "healthy"
                ? "Healthy"
                : "Unhealthy";

        uptimeElement.textContent =
            formatUptime(health.uptime);

        lastCheck.textContent =
            new Date(
                health.timestamp
            ).toLocaleTimeString();

        projectCount.textContent =
            projects.length;

        logCount.textContent =
            logs.length;

        monitoringCount.textContent =
            "1";

        toolCount.textContent =
            tools.tools
                ? tools.tools.length
                : "2";

        renderProjects(projects);
        renderLogs(logs);
        renderMonitoring(monitoring);

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        statusElement.textContent =
            "Backend disconnected";

        statusElement.style.color =
            "#f87171";

        backendHealth.textContent =
            "Offline";

        projectCount.textContent = "--";
        logCount.textContent = "--";
        monitoringCount.textContent = "--";
        toolCount.textContent = "--";
    }
}


function renderProjects(projects) {

    if (!projects || projects.length === 0) {

        projectsList.innerHTML = `
            <p class="empty-state">
                No projects found.
            </p>
        `;

        projectTotal.textContent =
            "0 projects";

        return;
    }

    projectTotal.textContent =
        `${projects.length} project${projects.length > 1 ? "s" : ""}`;

    projectsList.innerHTML =
        projects.map(project => `

            <article class="project-card">

                <div class="project-card-header">

                    <div>

                        <span class="project-id">
                            PROJECT #${project.id}
                        </span>

                        <h3>
                            ${escapeHTML(project.name)}
                        </h3>

                    </div>

                    <span class="project-status">
                        ${escapeHTML(project.status)}
                    </span>

                </div>

                <p class="project-description">
                    ${escapeHTML(project.description)}
                </p>

                <div class="project-meta">

                    <div>

                        <span>
                            TECHNOLOGY
                        </span>

                        <strong>
                            ${escapeHTML(project.technology)}
                        </strong>

                    </div>

                    <div>

                        <span>
                            CREATED
                        </span>

                        <strong>
                            ${formatDate(project.created_at)}
                        </strong>

                    </div>

                </div>

                <div class="project-buttons">

                    <button
                        class="edit-button"
                        onclick="editProject(${project.id})">
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteProject(${project.id})">
                        Delete
                    </button>

                </div>

            </article>

        `).join("");
}


function renderLogs(logs) {

    if (!logs || logs.length === 0) {

        recentLogs.innerHTML = `
            <p class="empty-state">
                No recent activity.
            </p>
        `;

        logCounter.textContent =
            "0 logs";

        return;
    }

    logCounter.textContent =
        `${logs.length} logs`;

    recentLogs.innerHTML =
        logs
            .slice(-5)
            .reverse()
            .map(log => `

                <div class="activity-item">

                    <div class="activity-level ${String(log.level).toLowerCase()}">
                        ${escapeHTML(log.level)}
                    </div>

                    <div class="activity-content">

                        <strong>
                            ${escapeHTML(log.service)}
                        </strong>

                        <p>
                            ${escapeHTML(log.message)}
                        </p>

                    </div>

                    <time>
                        ${formatDate(log.created_at)}
                    </time>

                </div>

            `)
            .join("");
}


function renderMonitoring(data) {

    if (!data) {
        return;
    }

    platformElement.textContent =
        data.platform || "--";

    nodeVersionElement.textContent =
        data.node || "--";

    cpuCoresElement.textContent =
        data.cpu || "--";

    if (data.memory) {

        memoryUsageElement.textContent =
            `${data.memory.usagePercent}%`;

    } else {

        memoryUsageElement.textContent =
            "--";
    }
}


function openAddProject() {

    projectForm.reset();

    projectId.value = "";

    modalTitle.textContent =
        "Add Project";

    projectModal.classList.remove(
        "hidden"
    );

    projectName.focus();
}


async function editProject(id) {

    try {

        const project =
            await fetchAPI(
                `/api/projects/${id}`
            );

        projectId.value =
            project.id;

        projectName.value =
            project.name;

        projectDescription.value =
            project.description || "";

        projectStatus.value =
            project.status || "active";

        projectTechnology.value =
            project.technology || "";

        modalTitle.textContent =
            "Edit Project";

        projectModal.classList.remove(
            "hidden"
        );

        projectName.focus();

    } catch (error) {

        console.error(error);

        alert(
            `Failed to load project: ${error.message}`
        );
    }
}


async function saveProject(event) {

    event.preventDefault();

    const id =
        projectId.value;

    const body = {

        name:
            projectName.value.trim(),

        description:
            projectDescription.value.trim(),

        status:
            projectStatus.value,

        technology:
            projectTechnology.value.trim()
    };

    if (!body.name) {

        alert(
            "Project name is required."
        );

        return;
    }

    try {

        if (id) {

            await fetchAPI(
                `/api/projects/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(body)
                }
            );

        } else {

            await fetchAPI(
                "/api/projects",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(body)
                }
            );
        }

        closeProjectModal();

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            `Failed to save project: ${error.message}`
        );
    }
}


async function deleteProject(id) {

    const confirmed =
        confirm(
            "Delete this project?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await fetchAPI(
            `/api/projects/${id}`,
            {
                method: "DELETE"
            }
        );

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            `Failed to delete project: ${error.message}`
        );
    }
}


function closeProjectModal() {

    projectModal.classList.add(
        "hidden"
    );

    projectForm.reset();

    projectId.value = "";
}


addProjectButton.addEventListener(
    "click",
    openAddProject
);

closeModal.addEventListener(
    "click",
    closeProjectModal
);

cancelProject.addEventListener(
    "click",
    closeProjectModal
);

projectForm.addEventListener(
    "submit",
    saveProject
);

document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeProjectModal
    );


function formatUptime(seconds) {

    if (!seconds) {
        return "--";
    }

    const days =
        Math.floor(seconds / 86400);

    const hours =
        Math.floor(
            (seconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    if (days > 0) {
        return `${days}d ${hours}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
}


function formatDate(date) {

    if (!date) {
        return "--";
    }

    return new Date(date).toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


const jsonInput =
    document.getElementById("jsonInput");

const jsonOutput =
    document.getElementById("jsonOutput");

const formatJsonButton =
    document.getElementById("formatJsonButton");

const sqlInput =
    document.getElementById("sqlInput");

const sqlOutput =
    document.getElementById("sqlOutput");

const analyzeSqlButton =
    document.getElementById("analyzeSqlButton");


formatJsonButton.addEventListener(
    "click",
    async () => {

        const input =
            jsonInput.value.trim();

        if (!input) {

            jsonOutput.textContent =
                "Enter JSON data first.";

            return;
        }

        try {

            const result =
                await fetchAPI(
                    "/api/tools/json/format",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                input
                            })
                    }
                );

            if (result.valid) {

                jsonOutput.textContent =
                    result.formatted;

            }

        } catch (error) {

            jsonOutput.textContent =
                `Invalid JSON\n\n${error.message}`;
        }
    }
);


analyzeSqlButton.addEventListener(
    "click",
    async () => {

        const query =
            sqlInput.value.trim();

        if (!query) {

            sqlOutput.innerHTML = `
                <div class="sql-result">
                    <span>Error</span>
                    <strong>
                        Enter SQL query first.
                    </strong>
                </div>
            `;

            return;
        }

        try {

            const result =
                await fetchAPI(
                    "/api/tools/sql/analyze",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                query
                            })
                    }
                );

            sqlOutput.innerHTML = `

                <div class="sql-result">
                    <span>Operation</span>
                    <strong>
                        ${escapeHTML(result.operation)}
                    </strong>
                </div>

                <div class="sql-result">
                    <span>WHERE</span>
                    <strong>
                        ${result.hasWhere ? "YES" : "NO"}
                    </strong>
                </div>

                <div class="sql-result">
                    <span>JOIN</span>
                    <strong>
                        ${result.hasJoin ? "YES" : "NO"}
                    </strong>
                </div>

                <div class="sql-result">
                    <span>GROUP BY</span>
                    <strong>
                        ${result.hasGroupBy ? "YES" : "NO"}
                    </strong>
                </div>

                <div class="sql-result">
                    <span>ORDER BY</span>
                    <strong>
                        ${result.hasOrderBy ? "YES" : "NO"}
                    </strong>
                </div>
            `;

        } catch (error) {

            sqlOutput.innerHTML = `
                <div class="sql-result">
                    <span>Error</span>
                    <strong>
                        ${escapeHTML(error.message)}
                    </strong>
                </div>
            `;
        }
    }
);


loadDashboard();

setInterval(
    loadDashboard,
    30000
);
// ================================
// PWA SERVICE WORKER
// ================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            const registration =
                await navigator.serviceWorker.register(
                    "/service-worker.js"
                );

            console.log(
                "Service Worker registered:",
                registration.scope
            );
        } catch (error) {
            console.error(
                "Service Worker registration failed:",
                error
            );
        }
    });
}


let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();

    deferredInstallPrompt = event;

    showInstallButton();
});


function showInstallButton() {

    if (document.getElementById("installAppButton")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "installAppButton";

    button.type = "button";

    button.textContent = "Install App";

    button.style.position = "fixed";
    button.style.right = "20px";
    button.style.bottom = "20px";
    button.style.zIndex = "9999";
    button.style.padding = "12px 18px";
    button.style.border = "0";
    button.style.borderRadius = "10px";
    button.style.cursor = "pointer";
    button.style.fontWeight = "600";

    button.addEventListener("click", async () => {

        if (!deferredInstallPrompt) {
            return;
        }

        deferredInstallPrompt.prompt();

        const result =
            await deferredInstallPrompt.userChoice;

        console.log(
            "Install result:",
            result.outcome
        );

        deferredInstallPrompt = null;

        button.remove();
    });

    document.body.appendChild(button);
}


window.addEventListener("appinstalled", () => {

    console.log(
        "Software Operations Platform installed."
    );

    const button =
        document.getElementById("installAppButton");

    if (button) {
        button.remove();
    }

    deferredInstallPrompt = null;
});