"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/trpc/react";
import { NoteEditor } from "./NoteEditor";
import { NoteCard } from "./NoteCard";

const Content = () => {
  type Topic = RouterOutputs["topic"]["getAll"][0];

  const { data: sessionData } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      // onSuccess: (data) => {
      //   setSelectedTopic(selectedTopic ?? data[0] ?? null);
      // },
    },
  );

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const createNote = api.note.createNote.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const deleteNote = api.note.removeNote.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const deleteTopic = api.topic.removeTopic.useMutation({
    onSuccess: () => {
      void refetchTopics(), void refetchNotes();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id} className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div
                  className="min-w-0 flex-1"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setSelectedTopic(topic);
                  }}
                >
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {topic.title}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {topic.createdAt.toDateString()}
                  </p>
                </div>
                <span>
                  <button
                    onClick={() =>
                      void deleteTopic.mutate({ topicId: topic.id })
                    }
                    className="btn btn-primary btn-sm"
                  >
                    Remove
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input input-sm input-bordered w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ noteId: note.id })}
              />
            </div>
          ))}
        </div>
        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              topicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Content;
