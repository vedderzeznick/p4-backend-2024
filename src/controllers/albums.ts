import { Router } from "express";
import { db } from "../db";
import { send } from "../response";
import { z } from "zod";
import { catchErrors } from "../errors";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const albumBodySchema = z.object({
  title: z.string().min(5).max(200),
  releaseDate: z.coerce.date(),
  genre: z.string().min(5).max(200),
  artistId: z.coerce.number(),
});

router.get(
  "/",
  catchErrors(async (_, res) => {
    const albums = await db.album.findMany({
      orderBy: { title: "asc" },
    });
    send(res).ok(albums);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: albumId } = idParamSchema.parse(req.params);
    const album = await db.album.findUniqueOrThrow({ where: { id: albumId } });
    send(res).ok(album);
  })
);

router.get(
    "/:id/songs",
    catchErrors(async (req, res) => {
      const { id: albumId } = idParamSchema.parse(req.params);
      const album = await db.album.findUniqueOrThrow({
        where: { id: albumId },
        include: {
            songs: true,
        },
    });
      send(res).ok(album);
    })
  );

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = albumBodySchema.parse(req.body);
    const album = await db.album.create({ data });
    send(res).createOk(album);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: albumId } = idParamSchema.parse(req.params);
    const albumData = albumBodySchema.parse(req.body);
    const updatedAlbum = await db.artist.update({
      where: { id: albumId },
      data: albumData,
    });
    send(res).ok(updatedAlbum);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: albumId } = idParamSchema.parse(req.params);
    const deletedAlbum = await db.album.delete({
        where: { id: albumId },
        include: {
            songs: true,
        },
    });
    send(res).ok(deletedAlbum);
  })
);

export default router;
