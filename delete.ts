import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.song.deleteMany({});

// Next, delete all albums to avoid foreign key constraints with artists
await prisma.album.deleteMany({});

// Finally, delete all artists
await prisma.artist.deleteMany({});
