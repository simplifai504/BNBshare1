import { CreateTokenForm } from "@/components/CreateTokenForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      {/* Gradient background effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4">
        {/* Stats bar */}
        <div className="mb-12 grid grid-cols-3 gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-6 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">0</div>
            <div className="text-xs text-white/60">Tokens Launched</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-2xl font-bold text-emerald-400">$0</div>
            <div className="text-xs text-white/60">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">0 BNB</div>
            <div className="text-xs text-white/60">Fees Collected</div>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Launch Tokens with{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                Tax Sharing
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0" />
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Create tokens on Four.Meme (BNB Chain) and send 100% of trading tax to a
            shared treasury. Claim your share later from your account.
          </p>
        </div>

        <CreateTokenForm />

        <section className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-emerald-400">100% Tax to Treasury</h3>
            <p className="text-sm text-white/70">
              All post-graduation tax goes to the treasury. Claim your share from the Claim page.
            </p>
          </div>
          <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-green-500/5 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-emerald-400">Powered by Four.Meme</h3>
            <p className="text-sm text-white/70">
              Tax Tokens on BNB Chain: bonding curve then DEX migration.
            </p>
          </div>
          <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-emerald-400">Tax 1% / 3% / 5% / 10%</h3>
            <p className="text-sm text-white/70">
              Choose trading fee rate (applied only after graduation).
            </p>
          </div>
          <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-green-500/5 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-emerald-400">Launch on Four.Meme</h3>
            <p className="text-sm text-white/70">
              Free Mode, bonding curve and automatic DEX migration.
            </p>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">How It Works</h2>
          <div className="space-y-6">
            <div className="group flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold shadow-lg shadow-emerald-500/50">
                01
              </span>
              <div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Fill Token Details</h3>
                <p className="text-sm text-white/70">
                  Name, symbol, image and tax rate (1%, 3%, 5% or 10%).
                </p>
              </div>
            </div>
            <div className="group flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold shadow-lg shadow-emerald-500/50">
                02
              </span>
              <div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Tax to Shared Treasury</h3>
                <p className="text-sm text-white/70">
                  100% of tax goes to BNBShare treasury. Each token is linked to your account.
                </p>
              </div>
            </div>
            <div className="group flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold shadow-lg shadow-emerald-500/50">
                03
              </span>
              <div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Launch & Claim</h3>
                <p className="text-sm text-white/70">
                  Create token on Four.Meme. When fees accumulate, claim from the Claim page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
