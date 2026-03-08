# Deployment Guide: Hermetica Website

This guide provides step-by-step instructions on how to deploy this full-stack application.
The architecture consists of:
1. A **Next.js Frontend** (deployed easily on Vercel)
2. A **Node/Express Backend** (deployed easily on Render)

Both interact with the same GitHub repository, making sure that your data JSON files stay in sync.

---

## Prerequisites
Before you start, make sure you have:
1. Created a GitHub account and pushed your entire project (the `Website` folder, including both the Next.js files and the `backend` folder) to a GitHub repository.
2. Ensure you have your environment variables ready (e.g., NextAuth secret, Google Client IDs, Database URLs, etc.).

---

## 1. Deploying the Frontend (Vercel)

Vercel is the creators of Next.js and the absolute best place to host it.

1. Go to [Vercel.com](https://vercel.com/) and sign in with your GitHub account.
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. **Configure Project:**
   - **Framework Preset:** Vercel should automatically detect `Next.js`.
   - **Root Directory:** Leave it as `./` (the root of the repo).
   - **Environment Variables:** Add all the required variables found in your application:
     - `NEXTAUTH_URL` (Set this to your newly deployed Vercel domain later, or use localhost initially if you don't know it yet).
     - `NEXTAUTH_SECRET` (A strong random string).
     - `AUTH_GOOGLE_ID` / `GOOGLE_CLIENT_ID`
     - `AUTH_GOOGLE_SECRET` / `GOOGLE_CLIENT_SECRET`
     - Database connection strings if you are using Neon/Drizzle (`DATABASE_URL`).
5. Click **Deploy**. Vercel will install dependencies (`npm install`), build the frontend (`npm run build`), and deploy it.

---

## 2. Deploying the Backend (Render)

Render is an excellent platform for deploying Node.js apps because it clones your whole repository. This means your Express backend can still reach `../data/json` without any issues!

1. Go to [Render.com](https://render.com/) and sign in with GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. **Configure the Web Service:**
   - **Name:** Choose a name (e.g., `hermetica-api`).
   - **Language:** `Node`
   - **Branch:** `main` (or whatever your default branch is).
   - **Root Directory:** `backend` (⚠️ **Crucial Step:** Type `backend` so Render knows where to run the commands).
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start` (This will execute `node dist/server.js`).
5. **Environment Variables:**
   - Add `PORT` mapped to a number like `10000` (Render typically sets this automatically, but you can explicitly define it).
6. Click **Create Web Service**. 
7. Render will build and deploy the Node.js server. Once finished, it will give you a URL like `https://hermetica-api.onrender.com`.

---

## 3. Integration & Final Changes

Once both are deployed, you need to tell your Frontend to talk to your new Render Backend instead of localhost.

1. In your **Frontend Code** (the Vercel app), wherever you eventually use `fetch()` or `axios` to get data from your API (like fetching Gallery or Projects data), make sure the URL points to your Render backend. 
   - **Best Practice:** Instead of hardcoding `http://localhost:5000/api/...`, create an environment variable in Next.js called `NEXT_PUBLIC_API_URL` and set it to your deployed Render URL.
2. Update your Vercel Environment Variables:
   - Add `NEXT_PUBLIC_API_URL` = `https://your-render-app-url.onrender.com`
3. Hit **Redeploy** on Vercel so the frontend picks up the new backend URL.

### CORS Configuration (Optional but Recommended)
In your backend `src/server.ts`, we set up `app.use(cors())`. For added security in production, you can restrict this to only allow requests from your Vercel frontend:

```typescript
// Replace: app.use(cors());
// With:
app.use(cors({
  origin: "https://your-vercel-frontend-url.vercel.app"
}));
```

You are now fully deployed! 🎉 Any time you push a git commit, Vercel and Render will automatically re-deploy your project with the latest code and JSON data.
