"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import Image from "next/image";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/");
        return;
      }

      setUser(data.user);

      const { data: bookmarkData } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      setBookmarks(bookmarkData || []);
      setLoading(false);
    };

    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.replace("/");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [mounted, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };
  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-6 md:mx-auto bg-slate-900/90 p-10 rounded-2xl shadow-2xl border border-slate-700 text-white mt-12">
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          {user?.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full border border-slate-600"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.user_metadata?.full_name?.charAt(0) || "U"}
            </div>
          )}

          <div>
            <h1 className="text-xl font-semibold">
              Welcome, {user?.user_metadata?.full_name}
            </h1>
            <p className="text-sm text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <BookmarkForm user={user} setBookmarks={setBookmarks} />
      <BookmarkList
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        user={user}
      />
    </div>
  );
}