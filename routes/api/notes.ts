import { Handlers } from "$fresh/server.ts";
import { Note } from "../../models/note.ts";
import { redisClient } from "../../utils/db.ts";

export const handler: Handlers = {
  async POST(_req, _ctx) {
    const allKeys: string[] = await redisClient.keys("notes-*");
    if (!allKeys.length) {
      console.log("empty");
    }
    const allNotes = [];
    const notes: string[] = await redisClient.mget(...allKeys);
    for (const note of notes) {
      allNotes.push(JSON.parse(note));
    }
    return new Response(JSON.stringify(allNotes));
  },
};

export async function getAllNotes() {
  const allKeys: string[] = await redisClient.keys("notes-*");
  if (!allKeys.length) {
    return [];
  }
  const notes: Note[] = await redisClient.mget(...allKeys);
  return notes;
}

export async function getNote(id: string) {
  const note = await redisClient.get(`notes-${id}`) as Note ?? "{}";
  return note;
}

export async function addNote(note: Note) {
  await redisClient.set(`notes-${note.id}`, JSON.stringify(note));
  return note;
}
