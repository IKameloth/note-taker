import { useState } from "react";
import type { RouterOutputs } from "~/trpc/react";
import ReactMarkdown from "react-markdown";

type Note = RouterOutputs["note"]["getAll"][0];

interface iNoteCardProps {
  note: Note;
  onDelete: () => void;
}

export const NoteCard = ({ note, onDelete }: iNoteCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${isExpanded ? "collapse-open" : ""} collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button className="btn btn-warning btn-xs px-5" onClick={onDelete}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
