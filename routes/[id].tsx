import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getNote } from "./api/notes.ts";
import { Note } from "../models/note.ts";
import { CSS, render } from "markdown";

type Props = {
  note: Note | null;
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const note = await getNote(ctx.params.id);
    if (!note) {
      return new Response(null, { status: 404 });
    }

    return ctx.render({
      note: note,
    });
  },
};

const markdown_body = `.markdown-body a {
  color: blue !important;
  text-decoration: underline !important;
}
.markdown-body ul {
  list-style: disc;
}
`;

export default function Details(props: PageProps<Props>) {
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
      <div class="container h-screen mx-auto max-w-screen-md">
        <div class="flex flex-col h-full items-center justify-start">
          <div class="block w-full p-6 bg-white rounded-lg hover:bg-gray-100">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {props?.data?.note?.title}
            </h5>
            <div class="rounded-lg text-center mb-2 bg-blue-300 p-1 text-xs font-semibold">
              {props?.data?.note?.type}
            </div>
            {props?.data?.note?.type != "video"
              ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: render(props.data?.note?.message ?? ""),
                  }}
                  data-color-mode="light"
                  data-light-theme="light"
                  data-dark-theme="dark"
                  class="markdown-body"
                >
                </div>
              )
              : (
                <a
                  href={props?.data?.note?.message}
                  target="_blank"
                  class="text-base cursor-pointer text-blue-900 underline lowercase truncate line-clmap-1 w-[300px] md:w-[500px]"
                >
                  {props?.data?.note?.message}
                </a>
              )}
            <div class="text-xs text-gray-600 italic mt-2">
              {new Date(props?.data?.note?.date ?? "").toDateString()}
            </div>
            {/* <a href="/">&larr;</a> */}
          </div>
        </div>
      </div>
    </>
  );
}
