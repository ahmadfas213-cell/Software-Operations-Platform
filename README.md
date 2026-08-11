\# Software Operations Platform



Centralized software operations platform for managing projects, system logs, monitoring data, and developer utilities from a single web interface.



Live production deployment :



https://software-operations-platform-production.up.railway.app/



\## Overview



Software Operations Platform is a full-stack web application designed to centralize common software operations into one dashboard.



The platform provides project management, system log monitoring, server metrics, and developer tools through a REST API and web-based interface.



\## Features



\* Project management

\* System log monitoring

\* Server monitoring

\* Developer utilities

\* REST API

\* MySQL database integration

\* Production deployment with Railway

\* Automatic deployment from GitHub

\* Responsive web interface

\* PWA support



\## Tech Stack



Frontend:



\* HTML

\* CSS

\* JavaScript

\* PWA



Backend:



\* Node.js

\* Express.js

\* REST API



Database:



\* MySQL

\* mysql2



Authentication \& Security :



\* JWT

\* bcryptjs

\* Environment variables



Deployment:



\* Railway

\* GitHub



\## Project Structure



```text

Software-Operations-Platform/

│

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

│

├── frontend/

│   ├── index.html

│   ├── app.js

│   ├── style.css

│   ├── manifest.json

│   ├── service-worker.js

│   └── icon-512.png

│

├── software\_operations.sql

├── package.json

├── package-lock.json

└── .gitignore

```



\## API Endpoints



\### Health



```text

GET /health

```



Returns the current application health status.



\### Projects



```text

GET /api/projects

```



Returns all registered projects.



\### Logs



```text

GET /api/logs

```



Returns application and system logs.



\### Monitoring



```text

GET /api/monitoring

```



Returns server monitoring information such as CPU, memory, uptime, platform, and Node.js version.



\### Developer Tools



```text

GET /api/tools

```



Returns available developer utilities.



\## Local Development



Clone the repository :



```bash

git clone https://github.com/ahmadfas213-cell/Software-Operations-Platform.git

cd Software-Operations-Platform

```



Install dependencies :



```bash

npm install

```



Create a `.env` file :



```env

PORT=3000



DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=

DB\_NAME=software\_operations



JWT\_SECRET=your\_secret\_key

```



Import the database schema from:



```text

software\_operations.sql

```



Start the application:



```bash

npm start

```



The application will be available at:



```text

http://localhost:3000

```



\## Production



The production application is deployed on Railway.



```text

GitHub

&#x20;  │

&#x20;  ▼

Railway

&#x20;  │

&#x20;  ├── Node.js / Express

&#x20;  ├── MySQL

&#x20;  └── Frontend

```



Every push to the `main` branch can trigger an automatic Railway deployment.



\## Environment Variables



The following variables are required for production:



```text

PORT

DB\_HOST

DB\_USER

DB\_PASSWORD

DB\_NAME

JWT\_SECRET

```



Sensitive environment variables are not stored in the repository.



\## Database



The project uses MySQL for persistent application data.



Database schema :



```text

software\_operations

```



Main data areas include:



\* Projects

\* Logs

\* Monitoring

\* Developer tools



\## Author



Ahmad Fitroh Annur Sholeh



Informatics Engineering Student



Focus:

Software Development



GitHub:

https://github.com/ahmadfas213-cell



\## License



This project is intended for educational and development purposes.



