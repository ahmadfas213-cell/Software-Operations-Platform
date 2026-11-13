# Software Operations Platform

A web dashboard that brings project records, application logs, server information, and developer utilities into one place.

Live app: https://software-operations-platform-production.up.railway.app/

## What it includes

- Project management
- Application and system log views
- Server information such as CPU, memory, uptime, platform, and Node.js version
- Developer utility endpoints
- REST API
- MySQL storage
- JWT-based authentication
- PWA support
- Railway deployment with GitHub integration

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL, mysql2 |
| Authentication | JWT, bcryptjs |
| Hosting | Railway |
| Other | PWA, environment variables |

## Project structure

```text
Software-Operations-Platform/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   ├── routes/
│   │   ├── projects.js
│   │   ├── logs.js
│   │   ├── monitoring.js
│   │   └── tools.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   ├── manifest.json
│   ├── service-worker.js
│   └── icon-512.png
├── software_operations.sql
├── package.json
├── package-lock.json
└── .gitignore
```

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/health` | Check whether the server is responding |
| GET | `/api/projects` | Get registered projects |
| GET | `/api/logs` | Get application and system logs |
| GET | `/api/monitoring` | Get server metrics and runtime information |
| GET | `/api/tools` | Get the available developer utilities |

## Run locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ahmadfas213-cell/Software-Operations-Platform.git
cd Software-Operations-Platform
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=software_operations

JWT_SECRET=replace_with_a_long_random_secret
```

Import the database structure from `software_operations.sql`, then start the app:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Port used by the server |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret used to sign JWTs |

Keep production credentials outside the repository. Do not commit your `.env` file.

## Deployment

The production app runs on Railway. The repository is connected to the deployment, so pushes to `main` can trigger a new build.

The production environment needs the database and JWT variables listed above.

## Database

The schema is provided in `software_operations.sql`. The app uses MySQL to store its operational data, including project and log records.

## Author

Ahmad Fitroh Annur Sholeh  
Informatics Engineering Student

GitHub: https://github.com/ahmadfas213-cell

## License

No separate open-source license is included in this repository.
