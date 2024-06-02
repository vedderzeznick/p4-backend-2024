import { Router } from "express";
import { db } from "../db";
import { send } from "../response";
import { z } from "zod";
import { catchErrors } from "../errors";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const songBodySchema = z.object({
  title: z.string().min(5).max(200),
  duration: z.coerce.number(),
  albumId: z.coerce.number(),
});

router.get(
  "/",
  catchErrors(async (_, res) => {
    const songs = await db.song.findMany({
      orderBy: { title: "asc" },
    });
    send(res).ok(songs);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: songId } = idParamSchema.parse(req.params);
    const song = await db.song.findUniqueOrThrow({ where: { id: songId } });
    send(res).ok(song);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = songBodySchema.parse(req.body);
    const song = await db.song.create({ data });
    send(res).createOk(song);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: songId } = idParamSchema.parse(req.params);
    const songData = songBodySchema.parse(req.body);
    const updatedSong = await db.song.update({
      where: { id: songId },
      data: songData,
    });
    send(res).ok(updatedSong);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: songId } = idParamSchema.parse(req.params);
    const deletedSong = await db.song.delete({
        where: { id: songId },
    });
    send(res).ok(deletedSong);
  })
);

export default router;