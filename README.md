# Goodfinds

A responsive e-commerce storefront built with React and Vite. It includes a
product catalog, category filters, search, favorites, a working shopping bag,
and a newsletter sign-up interaction.

> This is a front-end demo. The products are sample data; checkout does not
> process payments or create orders, and the newsletter form does not submit
> to a mailing service. Product photos and web fonts load from external
> services.

## Run locally

Requirements: Node.js 22 or newer and npm.

```powershell
cd frontend
npm ci
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). To create and
preview a production build:

```powershell
npm run build
npm run preview
```

## Run with Docker

Install and start Docker Desktop, open PowerShell in this project folder, and
run:

```powershell
docker compose up --build -d
```

Open [http://localhost:8080](http://localhost:8080). The compose service builds
the frontend into a production image and serves it with Nginx.

Useful commands:

```powershell
docker compose ps
docker compose logs -f storefront
docker compose down
```

If port `8080` is already in use, choose another host port in PowerShell before
starting Compose:

```powershell
$env:STORE_FRONTEND_PORT = "8081"
docker compose up --build -d
```

Then open `http://localhost:8081`.

## Save the source code to GitHub

1. Sign in to GitHub and create a **new empty repository** (for example,
   `goodfinds-store`). Do not initialize it with a README or `.gitignore`.
2. Install Git if it is not already installed.
3. In PowerShell, move to this project folder and run the following. Replace
   `YOUR-USERNAME` with your GitHub username:

```powershell
git init
git add .
git commit -m "Build Goodfinds storefront"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/goodfinds-store.git
git push -u origin main
```

GitHub will ask you to authenticate if needed. The `.gitignore` keeps
dependencies, build output, and local environment files out of the repository.
Never commit real credentials or payment secrets.

## Deploy

For a server or cloud VM with Docker and the Compose plugin installed, clone
your GitHub repository and start the application:

```powershell
git clone https://github.com/YOUR-USERNAME/goodfinds-store.git
cd goodfinds-store
docker compose up --build -d
```

The storefront listens on port `8080`. For a public production deployment,
point a domain and HTTPS reverse proxy/load balancer at that port, and allow
inbound traffic only as required by your hosting setup. Rebuild after code
updates with `git pull` followed by `docker compose up --build -d`.

## Project layout

```text
frontend/          React/Vite storefront and production Docker image
docker-compose.yml Local container orchestration
README.md          Local run, GitHub, and deployment instructions
```
