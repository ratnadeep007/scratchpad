import { Handlers } from "$fresh/server.ts";
import { Note } from "../../models/note.ts";
import { redisClient } from "../../utils/db.ts";

const body = [
  {
    "id": 1,
    "date": new Date().toISOString(),
    "message": "hello world!",
    "title": "some title",
    "type": "note",
  },
  {
    "id": 2,
    "date": new Date().toISOString(),
    "message":
      "some very large text that needs to be truncated, some very large text that needs to be truncated, some very large text that needs to be truncated",
    "title": "some message thats too large that needs to be truncated",
    "type": "note",
  },
  {
    "id": 3,
    "date": new Date().toISOString(),
    "message": "https://google.com",
    "title": "some title",
    "type": "video",
  },
];

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = JSON.parse(await req.text());
    body.push(data);
    return new Response(JSON.stringify(body));
  },
};

export async function getAllNotes() {
  const allKeys: string[] = (await redisClient.sendCommand("KEYS", "notes-*"))
    .value();
  if (!allKeys.length) {
    return [];
  }
  const allNotes = [];
  const notes = (await redisClient.sendCommand("MGET", ...allKeys))
    .value();
  for (const note of notes) {
    allNotes.push(JSON.parse(note));
  }
  return allNotes;
}

export async function getNote(id: string) {
  const note = (await redisClient.sendCommand(
    "GET",
    `notes-${id}`,
  )).value();
  return JSON.parse(note);
}

export async function addNote(note: Note) {
  await redisClient.sendCommand(
    "SET",
    `notes-${note.id}`,
    JSON.stringify(note),
  );
  return note;
}
