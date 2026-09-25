# Parvez Portfolio Platform

This workspace contains two independently manageable applications:

- `frontend/` - React/Vite SPA for the portfolio and EZ Foundation experience.
- `backend/` - Express API and SQLite persistence for EZ Foundation.

They are intentionally separated so each folder can be copied into its own Git repository and deployed independently.

## Local development

Terminal 1:

```powershell
Set-Location .\backend
npm install
Copy-Item .env.example .env
npm start
```

Terminal 2:

```powershell
Set-Location .\frontend
npm install
npm run dev
```

The frontend uses `http://localhost:8787/api` by default. Set `VITE_API_URL` in `frontend/.env` when the API is deployed elsewhere.

See [frontend/README.md](./frontend/README.md) and [backend/README.md](./backend/README.md) for application-specific commands.
