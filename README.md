# 🚀 Planet Media Frontend (React + Vite + EC2 Deployment)

This is the frontend application built using:

- React (Vite)
- TypeScript
- React Router
- Axios (API calls)
- AWS API Gateway (Backend integration)
- Nginx (Production hosting on EC2 Ubuntu)

---

# 🧠 Architecture

---

# ⚙️ Tech Stack

- React 18+
- Vite
- TypeScript
- React Router DOM
- Axios
- Lucide Icons
- Nginx (Production)
- Ubuntu EC2 (Hosting)

---

# 📁 Project Structure

```
src/
 ├── pages/
 │    ├── Login.tsx
 │    ├── Signup.tsx
 │    ├── OtpVerification.tsx
 │    ├── ForgotPassword.tsx
 │    ├── ChangePassword.tsx
 │
 ├── services/
 │    ├── api.ts
 │
 ├── utils/
 │    ├── constants.ts
 │
 ├── App.tsx
 ├── main.tsx
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash id="feclone"
git clone https://github.com/ullasraj/aws_coginto_task_frontend.git
cd aws_coginto_task_frontend
```

---

## 2. Install Dependencies

```bash id="feinstall"
npm install
```

---

## 3. Create `.env`

```env id="feenv"
VITE_API_BASE_URL=https://your-api-gateway-url/dev
```

---

## 4. Run Locally

```bash id="felocal"
npm run dev
```

---

# 🏗️ Build for Production

```bash id="febuild"
npm run build
```

---

# 🌐 Deploy to EC2 (Ubuntu + Nginx)

## 1. Install Nginx

```bash id="feng1"
sudo apt update
sudo apt install nginx -y
```

---

## 2. Clone Project on EC2

```bash id="feng2"
git clone https://bitbucket.org/your-username/your-repo.git
cd planet-media-frontend
```

---

## 3. Install & Build

```bash id="feng3"
npm install
npm run build
```

---

## 4. Copy Build to Nginx

```bash id="feng4"
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

---

## 5. Configure Nginx

```bash id="feng5"
sudo nano /etc/nginx/sites-available/default
```

Paste:

```nginx id="nginxfe"
server {
    listen 80;
    server_name your-ec2-ip;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Restart:

```bash id="feng6"
sudo systemctl restart nginx
```

---

## 6. Open App

```txt id="feopen"
http://your-ec2-ip
```

---

# 🔐 API Integration

All API calls use backend URL:

```ts id="feapi"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

Example:

```ts id="feapi2"
axios.post(`${BASE_URL}/auth/login`, data);
```

---

# 🔐 Auth Flow

1. User Signup
2. OTP Verification
3. Login (JWT from Cognito)
4. Forgot Password
5. Reset Password

---

# ⚠️ CORS IMPORTANT

If frontend fails but Postman works:

✔ Fix backend CORS:

```yaml id="fecors"
cors:
  origin: "*"
```

or restrict:

```yaml id="fecors2"
origin: "http://your-ec2-ip"
```

---

# 🚀 Deployment Flow

## Every update:

```bash id="fedeploy"
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

---

# 🧱 Common Issues

---

## ❌ API not working

✔ Check:

- `VITE_API_BASE_URL`
- API Gateway URL
- CORS enabled

---

## ❌ Blank page after deploy

✔ Fix:

- Run `npm run build` again
- Ensure Nginx root = `/var/www/html`

---

# 📌 Useful Commands

```bash id="fecn"
npm run dev        # local dev
npm run build      # production build


```
