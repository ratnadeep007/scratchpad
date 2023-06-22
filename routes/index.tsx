import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import OverviewCard from "../components/OverviewCard.tsx";
import { Note } from "../models/note.ts";
import { getAllNotes } from "./api/notes.ts";

type Props = {
  allNotes: Note[];
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const allNotes = await getAllNotes();

    return ctx.render({
      allNotes: [...allNotes],
    });
  },
};

export default function Home(props: PageProps<Props>) {
  // const count = useSignal(3);
  return (
    <>
      <Head>
        <title>ScratchPad</title>
      </Head>
      <div class="container p-4 h-screen mx-auto max-w-screen-md">
        <div class="flex flex-col h-full items-center justify-center">
          <ul class="list-disc w-full flex flex-col h-full items-start justify-start gap-3">
            {props.data.allNotes.map((el) => <OverviewCard note={el} />)}
          </ul>
        </div>
      </div>
    </>
  );
}
