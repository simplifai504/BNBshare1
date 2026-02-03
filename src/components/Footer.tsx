import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-emerald-400">4Share</span>
            <span className="text-sm text-white/50">Tax Tokens · Four.Meme · Treasury</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="text-white/70 transition hover:text-emerald-400">
              Home
            </Link>
            <Link href="/create" className="text-white/70 transition hover:text-emerald-400">
              Token Creator
            </Link>
            <Link href="/tokens" className="text-white/70 transition hover:text-emerald-400">
              Tokens
            </Link>
            <Link href="/claim" className="text-white/70 transition hover:text-emerald-400">
              Claim
            </Link>
            <Link href="/how-to-claim" className="text-white/70 transition hover:text-emerald-400">
              How to Claim
            </Link>
            <a
              href="https://four.meme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition hover:text-emerald-400"
            >
              Four.Meme
            </a>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-white/50">
          BNB Chain. 100% tax to shared treasury. Claim your share from Claim page.
        </p>
      </div>
    </footer>
  );
}
