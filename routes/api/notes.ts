import { Handlers } from "$fresh/server.ts";
import { Note } from "../../models/note.ts";

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
  return body;
}

export async function getNote(id: number) {
  return body[id - 1];
}

export async function addNote(note: Note) {
  body.push(note);
  return body;
}
