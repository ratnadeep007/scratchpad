import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getNote } from "./api/notes.ts";
import { Note } from "../models/note.ts";

type Props = {
  note: Note;
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const note = await getNote(parseInt(ctx.params.id));

    return ctx.render({
      note: note,
    });
  },
};

export default function Details(props: PageProps<Props>) {
  return (
    <>
      <Head>
        <title>ScratchPad</title>
      </Head>
      <div class="container h-screen mx-auto max-w-screen-md">
        <div class="flex flex-col h-full items-center justify-start">
          <div class="block max-w-sm p-6 bg-white rounded-lg hover:bg-gray-100">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {props.data.note.title}
            </h5>
            <div class="rounded-lg text-center mb-2 bg-blue-300 p-1 text-xs font-semibold">
              {props.data.note.type}
            </div>
            {props.data.note.type != "video"
              ? (
                <div class="text-base text-gray-900 capitalize line-clmap-3 w-[300px] md:w-[300px]">
                  {props.data.note.message}
                </div>
              )
              : (
                <a
                  href={props.data.note.message}
                  target="_blank"
                  class="text-base cursor-pointer text-blue-900 underline lowercase truncate line-clmap-1 w-[300px] md:w-[500px]"
                >
                  {props.data.note.message}
                </a>
              )}
            <div class="text-xs text-gray-600 italic mt-2">
              {new Date(props.data.note.date).toLocaleString()}
            </div>
            {/* <a href="/">&larr;</a> */}
          </div>
        </div>
      </div>
    </>
  );
}
