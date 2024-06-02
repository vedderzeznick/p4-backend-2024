import { Router } from "express";
import { db } from "../db";
import { send } from "../response";
import { z } from "zod";
import { catchErrors } from "../errors";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const artistBodySchema = z.object({
  name: z.string().min(5).max(200),
  bio: z.string().min(5).max(2000),
  country: z.string().min(5).max(200),
});

router.get(
  "/",
  catchErrors(async (_, res) => {
    const artists = await db.artist.findMany({
      orderBy: { name: "asc" },
    });
    send(res).ok(artists);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: artistId } = idParamSchema.parse(req.params);
    const artist = await db.artist.findUniqueOrThrow({ where: { id: artistId } });
    send(res).ok(artist);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = artistBodySchema.parse(req.body);
    const artist = await db.artist.create({ data });
    send(res).createOk(artist);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: artistId } = idParamSchema.parse(req.params);
    const artistData = artistBodySchema.parse(req.body);
    const updatedArtist = await db.artist.update({
      where: { id: artistId },
      data: artistData,
    });
    send(res).ok(updatedArtist);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: artistId } = idParamSchema.parse(req.params);
    const deletedArtist = await db.artist.delete({
        where: { id: artistId },
        include: {
            albums: {
                include: {
                    songs: true,
                },
            },
        },
    });
    send(res).ok(deletedArtist);
  })
);

export default router;