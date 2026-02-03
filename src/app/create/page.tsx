import { CreateTokenForm } from "@/components/CreateTokenForm";

export default function TokenCreatorPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Token Creator
          </h1>
          <p className="text-white/60">
            Launch your token on Four.Meme with 100% tax to the shared treasury.
          </p>
        </div>

        <CreateTokenForm />
      </div>
    </main>
  );
}
