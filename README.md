This is a Template Auth for Build Your Project.

## Getting Started

install Nextjs15+ App Router:
npx create-next-app@latest

install node package manager:

1. npm i firebase
2. npm i next-auth
3. npm i boxicons
4. npm i bcrypt
5. npm i --save-dev @types/bcrypt
   
if not installed that npm, add --force

## Step 1:
1. Make file .env.local and write NEXTAUTH_SECRET on .env.local
2. Go to [Firebase](https://firebase.google.com) and get firebase environment key 
3. Write name environment like src/lib/init.ts
4. Create database in Firestore and set true

# Step 2: setting Oauth google
1. Make OAuth google in [Google-Cloud]([https://firebase.google.com](https://console.cloud.google.com/)) and get environment key OAuth
2. Write name environment like src/app/api/[...nextauth]/route.ts

# Last Step:
1. npm run dev
2. Open [http://localhost:3000](http://localhost:3000)
3. Try to Login on top right
