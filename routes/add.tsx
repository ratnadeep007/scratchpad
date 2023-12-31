import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import MarkdownEditor from "../islands/Editor.tsx";
import { Note } from "../models/note.ts";
import { addNote, getAllNotes } from "../routes/api/notes.ts";
import { CSS } from "markdown";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, _ctx) {
    const form = await req.formData();
    const data = {
      message: form.get("message")?.toString(),
      title: form.get("title")?.toString(),
      date: new Date().toISOString(),
      id: crypto.randomUUID(),
      type: form.get("type")?.toString(),
    } as unknown as Note;
    await addNote(data);

    const headers = new Headers();
    headers.set("location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

const markdown_body = `.markdown-body a {
  color: blue !important;
  text-decoration: underline !important;
}`;

export default function Add() {
  return (
    <>
      <Head>
        <title>ScratchPad</title>
        <style>
          {CSS}
        </style>
        <style>
          {markdown_body}
        </style>
      </Head>
      <div class="container p-4 h-screen mx-auto max-w-screen-md">
        <form method="post">
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter title here"
              required
            />
          </div>
          <div class="mb-6">
            <MarkdownEditor />
          </div>
          <div class="mb-6">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Choose type</option>
              <option value="note">Note</option>
              <option value="video">Video</option>
            </select>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
