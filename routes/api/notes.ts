import { Note } from "../../models/note.ts";
import { db } from "../../utils/db.ts";

export async function getAllNotes() {
  try {
    const notes = [];
    for await (const note of db.list({ prefix: ["notes"] })) {
      notes.push(note.value);
    }
    return notes;
  } catch (err) {
    console.error("getAllNotes error:", err);
  }
}

export async function getNote(id: string) {
  try {
    const res = await db.get<Note>(["notes", id]);
    return res.value;
  } catch (err) {
    console.error("getNote error:", err);
  }
}

export async function addNote(note: Note) {
  // create a primary key for deno kv store
  const primaryKey = ["notes", note.id];
  // do atomic operation similar to transaction with id as primary key
  try {
    await db.atomic()
      .check({ key: primaryKey, versionstamp: null })
      .set(primaryKey, note)
      .commit();
    return { status: 201 };
  } catch (err) {
    console.error("addNote error:", err);
  }
}
