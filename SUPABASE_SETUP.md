# Supabase Setup Guide

## Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Name: `mission-control`
5. Region: Choose closest to you
6. Password: Generate strong password
7. Wait for project to be created (~2 minutes)

## Step 2: Get API Keys
Once project is ready:
1. Go to Project Settings → API
2. Copy these values:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public` key → NEXT_PUBLIC_SUPABASE_ANON_KEY

## Step 3: Run Schema
1. Go to SQL Editor (left sidebar)
2. Click "New query"
3. Copy/paste contents of `supabase/schema.sql`
4. Click "Run"
5. Verify tables created: Tables & Views section

## Step 4: Add to Vercel Environment Variables
In Vercel dashboard:
1. Project Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
3. Redeploy

## Step 5: Test
Visit your Vercel URL and:
1. Check tasks load from Supabase
2. Drag a task to new column
3. Refresh page - task should stay

## Troubleshooting
- If Supabase fails, falls back to file system
- Check browser console for errors
- Verify environment variables in Vercel

Done! 🎉
