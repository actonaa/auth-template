This is a Template Auth ReactJS for build your Project.

## Getting Started

install Nextjs15+ App Router:
npx create-next-app@latest

install node package manager:

npm i firebase
npm i next-auth
npm i boxicons
npm i bcrypt
npm i --save-dev @types/bcrypt

if not installed that npm, add --force

## Step 1:

1. Change file env.local -> .env.local and write random NEXTAUTH_SECRET
2. Go to [Firebase](https://firebase.google.com) and get firebase environment key
3. Write environment key in .env.local
4. Create database in Firestore and set true

# Step 2: Setting Oauth Foogle

1. Make OAuth google in [Google Cloud](https://console.cloud.google.com/) and get environment key OAuth
2. Write environment key in .env.local

# Step 3: Setting Oauth Facebook

1. Make OAuth google in [Facebook Developer](https://developers.facebook.com/) and get environment key OAuth
2. Write environment key in .env.local

# Last Step:

1. npm run dev
2. Open [http://localhost:3000](http://localhost:3000)
3. Try to Login on top right
