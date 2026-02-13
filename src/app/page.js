import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <div className="bg-white/20 backdrop-blur-lg p-25 rounded-2xl shadow-xl text-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Smart Bookmark App
      </h1>
      <AuthButton />
    </div>
  );
}
