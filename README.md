# Student Task Manager — CI/CD Pipeline Project

A Node.js + Express task manager app with a complete end-to-end CI/CD pipeline
using GitHub Actions, Docker, SonarQube, and Netlify.

---

## 🏗️ Project Structure

```
student-task-manager/
├── src/
│   ├── app.js              ← Express REST API
│   └── server.js           ← Server entry point
├── tests/
│   └── app.test.js         ← Jest unit tests
├── public/
│   └── index.html          ← Frontend UI
├── .github/
│   └── workflows/
│       └── ci-cd.yml       ← Full CI/CD pipeline
├── Dockerfile              ← Lab 4
├── sonar-project.properties← Lab 8
└── package.json
```

---

## 🚀 CI/CD Pipeline Stages

| Stage | Tool | Lab |
|-------|------|-----|
| Code Push | Git + GitHub | Lab 1 |
| Install & Build | npm (Node.js) | Lab 2 |
| Automated Testing | Jest + GitHub Actions | Lab 3 |
| Docker Image Build | Docker | Lab 4 |
| Push to Docker Hub | Docker + GitHub Actions | Lab 5 |
| Deploy Frontend | Netlify | Lab 6 |
| Code Quality Check | SonarQube | Lab 8 |
| Secure Credentials | GitHub Secrets | Lab 9 |

---

## ⚙️ Setup Instructions

### Step 1: Fork / Clone the repo
```bash
git clone https://github.com/<your-username>/student-task-manager.git
cd student-task-manager
```

### Step 2: Install dependencies locally
```bash
npm install
```

### Step 3: Run locally
```bash
npm start
# Open http://localhost:3000
```

### Step 4: Run tests locally
```bash
npm test
```

### Step 5: Build Docker image locally (Lab 4)
```bash
docker build -t student-task-manager .
docker run -p 3000:3000 student-task-manager
```

### Step 6: Set up GitHub Secrets (Lab 9)
Go to your GitHub repo → Settings → Secrets and Variables → Actions → New Secret

| Secret Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Your Docker Hub access token |
| `SONAR_TOKEN` | Your SonarQube/SonarCloud token |
| `NETLIFY_AUTH_TOKEN` | Your Netlify personal access token |
| `NETLIFY_SITE_ID` | Your Netlify site ID |

### Step 7: Push to GitHub — Pipeline runs automatically!
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Toggle complete |
| DELETE | `/api/tasks/:id` | Delete a task |

---


