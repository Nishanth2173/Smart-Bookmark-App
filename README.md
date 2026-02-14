# 📑Smart Bookmark App
A full-stack real time smart bookmark manager built with **Next.js (App Router)**, **Supabase**, **Tailwind css**.
This application allow users to authenticate using Google OAuth and manage their personal bookmarks with real-time cross-tabs syncronzation.

## 🚀Tech Stack
  - **Node.js 16.1.6 (App Router)**
  - **Supabase**
    - Googlr OAuth Authenication
    - PostgreSQL Database
    - Row Level Security (RLS)
  - **Tailwind css**
## ✨ Features
  - 🔐Google OAuth login (no email/ password)
  - 🛡️Secure user-specific bookmarks using RLS
  - ➕ADD bookmarks
  - 🗑️Delete bookmarks
  - ⚡Real-time updates across multiple tabs
  - 🔄Cross-tabs logout synchronization
  - 👤User profile display (name, email and avatar pic of the mail id) **Opitonial created**

# Project Folder

├── 📁 public
  ├── 🖼️ file.svg
  ├── 🖼️ globe.svg
  ├── 🖼️ next.svg
  ├── 🖼️ vercel.svg
  └── 🖼️ window.svg
├── 📁 src
  ├── 📁 app
  │   ├── 📁 dashboard
      └── 📄 page.js
      ├── 📄 favicon.ico
      ├── 🎨 globals.css
      ├── 📄 layout.js
      └── 📄 page.js
  ├── 📁 components
      ├── 📄 AuthButton.js
      ├── 📄 BookmarkForm.js
      ├── 📄 BookmarkItem.js
      └── 📄 BookmarkList.js
  └── 📁 lib
      └── 📄 supabaseClient.js
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.mjs
├── ⚙️ jsconfig.json
├── 📄 next.config.mjs
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 postcss.config.mjs

# Project Setup
  ## 🗄️Supabase Database
  https://supabase.com/
  - First signup and create organization.
  - Now create a new project in supabase and choose region as mumbai
  - After creating project go to the sidebar and select SQL editior and create table named as bookmarks or anything you like.
  - Create 'bookmarks' table with columns:
    - id (uuid, primary key, gen_random_uuid())
    - title (text)
    - url (text)
    - user_id (uuid)
    - created_at (timestamptz, default now())
 - After that go to the Table editior and you will see the tables that you had created. Then click on the three dot's.
 - There we will find policies click it and add policies as below,
    - SELECT: auth.uid() = user_id
    - INSERT: auth.uid() = user_id
    - DELETE: auth.uid() = user_id
 - And also important thing **enable Realtime**, you will see this option in the table editior. With the help of this only we can use the database with realtime data updation.
    - Enable Google OAuth in authentication settings.
    - For this we need to go for the google cloud to get clientid and secret key. You can find this process in google.
    - Now our database is ready with realtime data updation with google OAuth only.
## Environment Variables
  Create a .env.local file:
  - NEXT_PUBLIC_SUPABASE_URL=your_project_url
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  - You can find your project url in settings and under Data API.
  - You can find anon key url in project settings API keys and go to legacy you can find it there.
  - Copy and paste all these keys in the env.locall file which will be used in our project.
    
# Challenges Faced and Solutions
   - While setup the database I faced the issues like enabling realtime, and finding api keys and client keys creation used in Google OAuth.
      - solution: With the help of google and Ai tools I had solved the issue.
   - Delete not syncing
      - solution: Used ID-based delete handling or replica identity full.
   - Web Socket closed/timeout
      - Solution: Solved by creating singleton Supabase client.
   - Hydration Error
      - Solution: Need to remove the extensions in the browser, then only the issue will be resolved. 

