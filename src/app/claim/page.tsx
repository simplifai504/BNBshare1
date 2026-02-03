"use client";

import { useAccount } from "wagmi";

export default function ClaimPage() {
  const { address, isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-white">Claim</h1>
        <p className="mb-8 text-white/60">
          Claim your share of tax from the tokens you created (shared treasury).
        </p>

        {!isConnected ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="mb-6 text-white/80">
              Connect your wallet to view your balance and withdraw accumulated
              fees from tokens you created on 4Share.
            </p>
            <p className="text-sm text-white/50">
              Tax (1–10%) from each token goes to the treasury. Claim your share here.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-8 shadow-xl backdrop-blur-sm">
            <div className="mb-6">
              <p className="text-sm text-white/60">Connected Wallet</p>
              <p className="font-mono text-emerald-400">{address}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-6 shadow-lg">
              <p className="mb-2 text-sm text-white/60">
                Available Fees
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">0.00 BNB</p>
              <p className="mt-1 text-xs text-white/50">
                Balance updates when backend attributes tax from your tokens to your account.
              </p>
            </div>
            <button
              disabled
              className="mt-6 w-full rounded-xl bg-white/10 py-3 font-medium text-white/50 transition-all hover:bg-white/20"
            >
              Withdraw (no funds)
            </button>
          </div>
        )}

        <div className="mt-12">
          <a
            href="/how-to-claim"
            className="text-emerald-400 hover:underline"
          >
            → How to claim
          </a>
        </div>
      </div>
    </main>
  );
}
