# Vercel Deployment

## ⚠️ Important Note
Vercel uses serverless functions with ephemeral filesystem. **Data persistence (tasks.json, stats.json) will NOT work** without a database.

### Options:
1. **Use Vercel for UI only** - Keep local server for data API
2. **Add database** - Supabase/PlanetScale for persistence
3. **Hybrid approach** - Vercel frontend + ngrok backend

## Deployment Steps

### Option 1: One-Click Deploy (Recommended for testing)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zaarnno-Dev-Hub-dot/mission-control)

### Option 2: GitHub Integration
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import `Zaarnno-Dev-Hub-dot/mission-control`
5. Deploy!

### Option 3: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## Environment Variables (if needed)
```
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Custom Domain
1. In Vercel dashboard → Project Settings → Domains
2. Add your domain (e.g., mission.dragons.io)
3. Update DNS records as instructed

## Post-Deployment
- Production URL will be: `https://mission-control-xxx.vercel.app`
- Auto-deploys on every Git push
- Preview deployments for PRs

## Current Data Workaround
For MVP with data persistence, options:
1. Keep local ngrok server for API
2. Use browser localStorage
3. Add Supabase (5 min setup)

Let me know which data approach you prefer!
