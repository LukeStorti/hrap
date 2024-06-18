1.  Download / Unzip folder.

2.  Create a .env file or edit the one provided.
    Add mongodb connection string to DATABASE_URL in the .env file .
    (I had issues with this, the cluster name should be included)
    eg (.env.example): DATABASE_URL="mongodb+srv://<name>:<password>@cluster0.n2evlx6.mongodb.net/<ClusterName>"

    Add secret string to NEXTAUTH_SECRET in the .env
    eg. NEXTAUTH_SECRET="NEXTAUTH_SECRET"

3.  run "npm install"

4.  run "npx prisma generate"

5.  run "npx prisma db push"

6.  run "npx prisma db seed"

7.  run "npm run dev"
