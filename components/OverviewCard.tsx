import { Note } from "../models/note.ts";

interface Props {
  note: Note;
}

export default function OverviewCard({ note }: Props) {
  return (
    <a href={`${note.id}`}>
      <li class="flex flex-col justify-center items-start border-l-4 px-2 rounded-sm border-blue-300 hover:border-blue-600 cursor-pointer">
        <span class="text-xl font-bold text-gray-900 capitalize line-clmap-1">
          {note.title}
        </span>
        {note.type != "video"
          ? (
            <span class="text-base text-gray-900 capitalize truncate line-clmap-1 w-[300px] md:w-[500px]">
              {note.message}
            </span>
          )
          : (
            <span class="text-base text-blue-900 underline lowercase truncate line-clmap-1 w-[300px] md:w-[500px]">
              {note.message}
            </span>
          )}
        <span class="text-xs text-gray-600 smallcase">
          {new Date(note.date).toLocaleString()}
        </span>
      </li>
    </a>
  );
}
