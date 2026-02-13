"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList({ bookmarks, setBookmarks, user }) {
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            if (payload.new.user_id === user.id) {
              setBookmarks((prev) => {
                if (prev.find((b) => b.id === payload.new.id)) return prev;
                return [payload.new, ...prev];
              });
            }
          }

          if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((b) => b.id !== payload.old.id)
              );
            }
          }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user.id, setBookmarks]);

  if (!bookmarks.length) {
    return <p className="text-gray-400">No bookmarks yet.</p>;
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          setBookmarks={setBookmarks}
        />
      ))}
    </div>
  );
}