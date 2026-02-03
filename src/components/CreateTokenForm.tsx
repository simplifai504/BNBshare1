"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, keccak256, toHex } from "viem";
import {
  FLAP_CONFIG,
  DexThreshType,
  MigratorType,
  DEXId,
  V3LPFeeProfile,
  TAX_RATES,
} from "@/lib/flap";
import { flapPortalAbi } from "@/lib/flap-abi";
import { uploadTokenMeta } from "@/lib/upload";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export function CreateTokenForm() {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState<"idle" | "uploading" | "creating" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [createdToken, setCreatedToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    taxRate: 0,
    devBuy: "",
    feeSharingEnabled: false,
    beneficiary: "",
    platform: "four" as "flap" | "four",
  });

  const TAX_RATES_FOUR = [1, 3, 5, 10] as const;

  const { writeContract, data: hash, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.platform === "four") return;
    if (!address || !isConnected) {
      setErrorMsg("Connect your wallet first");
      setStatus("error");
      return;
    }

    const beneficiary = form.feeSharingEnabled && form.beneficiary
      ? form.beneficiary as `0x${string}`
      : address;

    if (form.feeSharingEnabled && form.beneficiary && !form.beneficiary.startsWith("0x")) {
      setErrorMsg("For fee sharing, enter a valid wallet address (0x...)");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    try {
      const imageInput = document.getElementById("token-image") as HTMLInputElement;
      const imageFile = imageInput?.files?.[0];
      if (!imageFile) {
        throw new Error("Upload a token image");
      }

      const cid = await uploadTokenMeta({
        name: form.name,
        symbol: form.symbol,
        description: form.description || undefined,
        image: imageFile,
        website: form.website || undefined,
        twitter: form.twitter || undefined,
        telegram: form.telegram || undefined,
      });

      setStatus("creating");

      const quoteAmt = form.devBuy ? parseEther(form.devBuy) : BigInt(0);
      const randomBytes = new Uint8Array(32);
      if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        crypto.getRandomValues(randomBytes);
      } else {
        randomBytes.forEach((_, i) => (randomBytes[i] = Math.floor(Math.random() * 256)));
      }
      const salt = keccak256(toHex(randomBytes));

      const params = {
        name: form.name,
        symbol: form.symbol,
        meta: cid,
        dexThresh: DexThreshType.FOUR_FIFTHS,
        salt,
        taxRate: form.taxRate,
        migratorType: form.taxRate > 0 ? MigratorType.V2_MIGRATOR : MigratorType.V3_MIGRATOR,
        quoteToken: ZERO_ADDRESS,
        quoteAmt,
        beneficiary,
        permitData: "0x" as `0x${string}`,
        extensionID: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        extensionData: "0x" as `0x${string}`,
        dexId: DEXId.DEX0,
        lpFeeProfile: V3LPFeeProfile.LP_FEE_PROFILE_STANDARD,
      };

      writeContract({
        address: FLAP_CONFIG.portal,
        abi: flapPortalAbi,
        functionName: "newTokenV4",
        args: [params],
        value: quoteAmt,
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  useEffect(() => {
    if (isSuccess && hash) {
      setStatus("success");
      setCreatedToken(FLAP_CONFIG.appUrl);
    }
  }, [isSuccess, hash]);

  useEffect(() => {
    if (writeError) {
      setErrorMsg(writeError.message);
      setStatus("error");
    }
  }, [writeError]);

  const isFour = form.platform === "four";
  const fourIntegrationReady = false;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5 p-8 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/50">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Create Token</h2>
          <p className="text-sm text-white/60">
            {isFour
              ? "Launch on Four.Meme with 100% tax to treasury"
              : "Launch on Flap.sh with fee sharing"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Platform
          </label>
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value as "flap" | "four" })}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="flap">Flap.sh</option>
            <option value="four">Four.meme</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Token Image *
          </label>
          <input
            id="token-image"
            type="file"
            accept="image/*"
            required
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white/80 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-black"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Token Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="My Token"
            required
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Symbol
          </label>
          <input
            type="text"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
            placeholder="MTK"
            required
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none uppercase"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">
          Description (optional)
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe your token..."
          rows={3}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Website (optional)
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="https://"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Twitter (optional)
          </label>
          <input
            type="text"
            value={form.twitter}
            onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            placeholder="@username"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Telegram (optional)
          </label>
          <input
            type="text"
            value={form.telegram}
            onChange={(e) => setForm({ ...form, telegram: e.target.value })}
            placeholder="t.me/..."
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">
          Trading Tax (%)
        </label>
        <p className="mb-2 text-xs text-white/50">
          {isFour
            ? "Four.Meme: 1%, 3%, 5% or 10% (applied after graduation)."
            : "Tax applied on each buy/sell. 0% to 10%."}
        </p>
        <div className="flex flex-wrap gap-2">
          {isFour
            ? TAX_RATES_FOUR.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setForm({ ...form, taxRate: rate })}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    form.taxRate === rate
                      ? "bg-emerald-500 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {rate}%
                </button>
              ))
            : TAX_RATES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, taxRate: value })}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    form.taxRate === value
                      ? "bg-emerald-500 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {label}
                </button>
              ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">
          Payment Token
        </label>
        <select className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none">
          <option value="bnb">BNB</option>
          <option value="aster">ASTER</option>
          <option value="usd1">USD1</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">
          Dev Buy (optional)
        </label>
        <input
          type="text"
          value={form.devBuy}
          onChange={(e) => setForm({ ...form, devBuy: e.target.value })}
          placeholder="0"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-white/50">
          Amount of BNB to buy tokens at launch
        </p>
      </div>

      {isFour ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="text-sm text-emerald-200">
            On Four.Meme, 100% of tax goes to BNBShare <strong>shared treasury</strong>.
            You can claim your share from the{" "}
            <a href="/claim" className="underline hover:text-emerald-400">Claim page</a>.
          </p>
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/80">
              Enable Fee Sharing
            </label>
            <button
              type="button"
              onClick={() => setForm({ ...form, feeSharingEnabled: !form.feeSharingEnabled })}
              className={`relative h-6 w-11 rounded-full transition ${
                form.feeSharingEnabled ? "bg-emerald-500" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition ${
                  form.feeSharingEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
          {form.feeSharingEnabled && (
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Send ALL fees to an address
              </label>
              <input
                type="text"
                value={form.beneficiary}
                onChange={(e) => setForm({ ...form, beneficiary: e.target.value })}
                placeholder="0x..."
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl bg-red-500/20 p-4 text-red-400">{errorMsg}</div>
      )}

      {status === "success" && (
        <div className="rounded-xl bg-emerald-500/20 p-4 text-emerald-400">
          Token created! Visit{" "}
          <a href={form.platform === "four" ? "https://four.meme" : FLAP_CONFIG.appUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {form.platform === "four" ? "Four.Meme" : "Flap.sh"}
          </a>{" "}
          to see it.
        </div>
      )}

      {isFour && !fourIntegrationReady && (
        <div className="rounded-xl bg-white/10 p-4 text-sm text-white/80">
          Four.Meme API integration (create token + 100% tax to treasury) is in development.
          For now you can create tokens at{" "}
          <a href="https://four.meme/create-token" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
            four.meme/create-token
          </a>{" "}
          and configure the recipient manually.
        </div>
      )}

      <button
        type="submit"
        disabled={
          status === "uploading" ||
          status === "creating" ||
          isConfirming ||
          !isConnected ||
          (isFour && !fourIntegrationReady)
        }
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
      >
        {!isConnected
          ? "Connect wallet to create token"
          : isFour && !fourIntegrationReady
          ? "Four.Meme: API integration in development"
          : status === "uploading"
          ? "Uploading metadata..."
          : status === "creating" || isConfirming
          ? "Creating token..."
          : "Create Token"}
      </button>
    </form>
  );
}
