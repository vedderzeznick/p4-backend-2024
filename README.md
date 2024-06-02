# DATA MODELING PRACTICE
to execute this program
- Create postgres DB executing =>  docker compose up -d
- Create .env  => PORT=8888
- Create .env  => DATABASE_URL="postgresql://martin:martin123@0.0.0.0:5432/music-info?schema=public"
- Create the tables => bunx prisma db push
- Insert dummy data => bun ./prisma/seed.ts
- Run express api app => bun start