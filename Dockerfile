# === Stage 1: Build Vite Frontend ===
FROM node:18 AS frontend-build
WORKDIR /app
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# === Stage 2: Install Python Dependencies ===
FROM python:3.11-slim AS backend-build
WORKDIR /app
COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY Backend/ .

# === Stage 3: Final Image using Debian-based Python & Nginx ===
FROM python:3.11-slim
WORKDIR /app

# 1) Install system packages: nginx, venv, BLAS/LAPACK
RUN apt-get update && \
    apt-get install -y nginx python3-venv python3-pip libblas3 liblapack3 && \
    rm -rf /var/lib/apt/lists/*

# 2) Copy backend code & requirements
COPY --from=backend-build /app/requirements.txt ./
COPY --from=backend-build /app/ .

# 3) Create and activate virtual environment, install Python dependencies
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# 4) Copy built frontend into nginx web root
COPY --from=frontend-build /app/dist /var/www/html

# Copy custom nginx config into Debian’s sites‑available and enable it
COPY nginx/default.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# 6) Expose HTTP port and start services
EXPOSE 80
CMD ["sh", "-c", ". /opt/venv/bin/activate && service nginx start && gunicorn -w 4 -b 127.0.0.1:5000 app:app"]
