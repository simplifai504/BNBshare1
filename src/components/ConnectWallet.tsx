"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPending ? "Connecting..." : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  );
}
