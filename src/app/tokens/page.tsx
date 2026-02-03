"use client";

import { useState } from "react";
import Link from "next/link";

const FOUR_MEME_URL = "https://four.meme";
const FLAP_APP_URL = "https://bnb.flap.sh";

// Mock tokens - en producción vendrían de un indexer o API
const MOCK_TOKENS = [
  {
    id: "1",
    name: "Example Token",
    symbol: "EXT",
    image: "https://ipfs.io/ipfs/bafkreiccy2x5735r2q3zvcce3ub3hcgpslnn5n3dqa7fn3tgr7qgtlbjhi",
    platform: "Flap.sh" as const,
    platformUrl: FLAP_APP_URL,
    marketCap: "$12,450",
    feesGenerated: "$234",
    createdAt: "2025-01-15",
    status: "bonding" as const,
  },
  {
    id: "2",
    name: "Meme Coin Alpha",
    symbol: "MCA",
    image: "https://ipfs.io/ipfs/bafkreiccy2x5735r2q3zvcce3ub3hcgpslnn5n3dqa7fn3tgr7qgtlbjhi",
    platform: "Four.meme" as const,
    platformUrl: FOUR_MEME_URL,
    marketCap: "$8,200",
    feesGenerated: "$156",
    createdAt: "2025-01-14",
    status: "dex" as const,
  },
];

export default function TokensPage() {
  const [platform, setPlatform] = useState("all");
  const [sort, setSort] = useState("newest");

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-white">Tokens lanzados</h1>
          <p className="text-white/60">
            Tokens creados con BNBShare (Four.Meme / Flap.sh)
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setPlatform("all")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              platform === "all"
                ? "bg-amber-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setPlatform("flap")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              platform === "flap"
                ? "bg-amber-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Flap.sh
          </button>
          <button
            onClick={() => setPlatform("four")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              platform === "four"
                ? "bg-amber-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Four.meme
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="newest">Más recientes</option>
            <option value="marketcap_high">Mayor Market Cap</option>
            <option value="marketcap_low">Menor Market Cap</option>
            <option value="fees">Más fees generados</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_TOKENS.map((token) => (
            <Link
              key={token.id}
              href={token.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-6 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02]"
            >
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={token.image}
                  alt={token.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400">
                    {token.name}
                  </h3>
                  <p className="text-sm text-white/60">${token.symbol}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-white/10 px-2 py-1 text-white/80">
                  {token.platform}
                </span>
                <span
                  className={`rounded-lg px-2 py-1 ${
                    token.status === "dex"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {token.status === "dex" ? "Migrated (DEX)" : "Bonding Curve"}
                </span>
              </div>
              <div className="mt-4 flex justify-between text-sm text-white/60">
                <span>MC: {token.marketCap}</span>
                <span>Fees: {token.feesGenerated}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
