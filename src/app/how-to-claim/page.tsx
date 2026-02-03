import Link from "next/link";

export default function HowToClaimPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <Link
          href="/"
          className="mb-8 inline-block text-emerald-400 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-white">How to Claim</h1>

        <p className="mb-12 text-white/70">
          Tax fees from the tokens you create accumulate in 4Share treasury.
          Here you can withdraw your share to your wallet.
        </p>

        <div className="mb-12 aspect-video rounded-2xl border border-emerald-500/20 bg-black overflow-hidden shadow-lg shadow-emerald-500/20">
          <video
            controls
            className="h-full w-full"
            poster="/videos/tutorial-poster.jpg"
          >
            <source src="/videos/tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 font-semibold text-white">
              Transfer Funds / Export Key
            </h2>
            <p className="mb-4 text-white/70">
              Send your tokens directly to MetaMask, Trust Wallet or any
              exchange.
            </p>
            <ol className="list-decimal space-y-3 pl-6 text-white/80">
              <li>Login with your social account</li>
              <li>Click the Transfer tab</li>
              <li>Paste recipient address and enter amount</li>
              <li>Click Send</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 font-semibold text-emerald-400">Tips</h2>
            <ul className="space-y-2 text-white/70">
              <li>• Use BSC (BEP-20) addresses only</li>
              <li>• You can send directly to exchange deposit addresses</li>
              <li>• Keep some BNB for gas fees (~$0.10)</li>
            </ul>
          </div>
        </div>

        <Link
          href="/claim"
          className="hover-glow mt-12 inline-block rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105"
        >
          Go to Claim
        </Link>
      </div>
    </main>
  );
}
