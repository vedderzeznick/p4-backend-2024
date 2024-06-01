import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const radiohead = await prisma.artist.upsert({
  where: { name: "Radiohead" },
  update: {},
  create: {
    name: "Radiohead",
    bio: "An English rock band formed in Abingdon, Oxfordshire, in 1985",
    country: "UK",
  },
});

// Create an album
const okcomputer = await prisma.album.upsert({
  where: { title: "OK Computer" },
  update: {},
  create: {
    title: "OK Computer",
    releaseDate: new Date("1997-05-21"),
    genre: "Alternative Rock",
    artistId: radiohead.id,
    songs: {
      create: [
        { title: "Airbag", duration: 284, trackNumber: 1 },
        { title: "Paranoid Android", duration: 387, trackNumber: 2 },
        { title: "Subterranean Homesick Alien", duration: 272, trackNumber: 3 },
        { title: "Exit Music (For A Film)", duration: 294, trackNumber: 4 },
      ],
    },
  },
});

const oasis = await prisma.artist.upsert({
  where: { name: "Oasis" },
  update: {},
  create: {
    name: "Oasis",
    bio: "An English rock band formed in Manchester in 1991.",
    country: "UK",
  },
});

// Create the "What's the Story Morning Glory" album
const morningGlory = await prisma.album.upsert({
  where: { title: "What's the Story Morning Glory" },
  update: {},
  create: {
    title: "What's the Story Morning Glory",
    releaseDate: new Date("1995-10-02"),
    genre: "Rock",
    artistId: oasis.id,
    songs: {
      create: [
        { title: "Hello", duration: 196, trackNumber: 1 },
        { title: "Roll with It", duration: 234, trackNumber: 2 },
        { title: "Wonderwall", duration: 259, trackNumber: 3 },
        { title: "Don't Look Back in Anger", duration: 287, trackNumber: 4 },
        { title: "Hey Now!", duration: 337, trackNumber: 5 },
        {
          title: '[Untitled] (aka "The Swamp Song — Excerpt 1")',
          duration: 44,
          trackNumber: 6,
        },
        { title: "Some Might Say", duration: 321, trackNumber: 7 },
        { title: "Cast No Shadow", duration: 288, trackNumber: 8 },
        { title: "She's Electric", duration: 208, trackNumber: 9 },
        { title: "Morning Glory", duration: 304, trackNumber: 10 },
        {
          title: '[Untitled] (aka "The Swamp Song — Excerpt 2")',
          duration: 40,
          trackNumber: 11,
        },
        { title: "Champagne Supernova", duration: 451, trackNumber: 12 },
      ],
    },
  },
});

// Upsert Pearl Jam to avoid duplicates
const pearlJam = await prisma.artist.upsert({
  where: { name: "Pearl Jam" },
  update: {},
  create: {
    name: "Pearl Jam",
    bio: "An American rock band formed in Seattle, Washington, in 1990.",
    country: "USA",
  },
});

// Create the "Ten" album
const ten = await prisma.album.upsert({
  where: { title: "Ten" },
  update: {},
  create: {
    title: "Ten",
    releaseDate: new Date("1991-08-27"),
    genre: "Grunge, Rock",
    artistId: pearlJam.id,
    songs: {
      create: [
        { title: "Once", duration: 220, trackNumber: 1 },
        { title: "Even Flow", duration: 295, trackNumber: 2 },
        { title: "Alive", duration: 335, trackNumber: 3 },
        { title: "Why Go", duration: 238, trackNumber: 4 },
        { title: "Black", duration: 340, trackNumber: 5 },
        { title: "Jeremy", duration: 318, trackNumber: 6 },
        { title: "Oceans", duration: 160, trackNumber: 7 },
        { title: "Porch", duration: 208, trackNumber: 8 },
        { title: "Garden", duration: 299, trackNumber: 9 },
        { title: "Deep", duration: 264, trackNumber: 10 },
        { title: "Release", duration: 547, trackNumber: 11 },
      ],
    },
  },
});