"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkItem({ bookmark, setBookmarks }) {
  const handleDelete = async () => {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);

    setBookmarks((prev) =>
      prev.filter((b) => b.id !== bookmark.id)
    );
  };

  return (
    <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg border border-slate-600 transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg opacity-0 animate-fadeIn">
      <div>
        <h2 className="font-semibold text-white">{bookmark.title}</h2>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-200 text-sm hover:underline"
        >
          {bookmark.url}
        </a>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-700 hover:text-red-400"
      >
        Delete
      </button>
    </div>
  );
}