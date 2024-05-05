import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Update the genre of the "What's the Story Morning Glory" album
const updatedAlbum1 = await prisma.album.update({
  where: {
    title: "What's the Story Morning Glory",
  },
  data: {
    genre: "Britpop",
  },
});
console.log("Updated Oasis album genre:", updatedAlbum1);

// Update the duration of the "Jeremy" song
const updatedSong = await prisma.song.updateMany({
  where: {
    title: "Jeremy",
  },
  data: {
    duration: 360, // Updated duration in seconds
  },
});
console.log("Updated Pearl Jam song duration:", updatedSong);

// Update the release date of the "OK Computer" album
const updatedAlbum2 = await prisma.album.update({
  where: {
    title: "OK Computer",
  },
  data: {
    releaseDate: new Date("1997-06-01"), // Corrected release date
  },
});
console.log("Updated Radiohead album release date:", updatedAlbum2);

//Delete songs from "What's the Story Morning Glory" album
const getWhatsTheStoryMorningGloriaAlbum = await prisma.album.findUnique({
  where: {
    title: "What's the Story Morning Glory",
  },
})
const deletedWhatsTheStoryMorningGlorySongs = await prisma.song.deleteMany({
  where: {
    albumId: getWhatsTheStoryMorningGloriaAlbum?.id,
  },
})

// Delete the "What's the Story Morning Glory" album and its songs
const deletedAlbum = await prisma.album.delete({
  where: {
    title: "What's the Story Morning Glory",
  },
});
console.log("Deleted Oasis album:", deletedAlbum);

// Delete the "Pearl Jam" artist, albums and songs
const pearlJam = await prisma.artist.findUnique({
  where: {
    name: "Pearl Jam",
  },
})
const pearlJamAlbums = await prisma.album.findMany({
    where: {
        artistId: pearlJam?.id,
    }
})
const deletePearlJamSongs = await prisma.song.deleteMany({
    where: {
        albumId: {
            in: pearlJamAlbums.map(album => album.id)
        }
    }
})
const deletePearlJamAlbums = await prisma.album.deleteMany({
    where: {
        artistId: pearlJam?.id
    }
})
const deletedArtist = await prisma.artist.delete({
  where: {
    name: "Pearl Jam",
  },
});
console.log(
  "Deleted Pearl Jam and all related albums and songs:",
  deletedArtist
);
