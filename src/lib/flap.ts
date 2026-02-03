/**
 * Flap.sh integration for BNB Chain
 * @see https://docs.flap.sh/flap/developers
 */

export const FLAP_CONFIG = {
  // BNB Chain - Portal address
  portal: "0xe2cE6ab80874Fa9Fa2aAE65D277Dd6B8e65C9De0" as const,
  // Upload API for token metadata
  uploadApi: "https://funcs.flap.sh/api/upload",
  // Flap app URL for token pages
  appUrl: "https://bnb.flap.sh",
} as const;

// Tax token implementation for salt generation (V2)
export const TAX_TOKEN_V2_IMPL =
  "0xae562c6A05b798499507c6276C6Ed796027807BA" as const;
// Standard token implementation
export const STANDARD_TOKEN_IMPL =
  "0x8b4329947e34b6d56d71a3385cac122bade7d78d" as const;

// Enums matching Flap contract
export const DexThreshType = {
  TWO_THIRDS: 0,
  FOUR_FIFTHS: 1,
  HALF: 2,
  _95_PERCENT: 3,
  _81_PERCENT: 4,
  _1_PERCENT: 5,
} as const;

export const MigratorType = {
  V3_MIGRATOR: 0,
  V2_MIGRATOR: 1,
} as const;

export const DEXId = {
  DEX0: 0,
  DEX1: 1,
  DEX2: 2,
} as const;

export const V3LPFeeProfile = {
  LP_FEE_PROFILE_STANDARD: 0,
  LP_FEE_PROFILE_LOW: 1,
  LP_FEE_PROFILE_HIGH: 2,
} as const;

// Tax rate: 0-10% in basis points (100 = 1%, 500 = 5%, 1000 = 10%)
export const TAX_RATES = [
  { value: 0, label: "0%" },
  { value: 100, label: "1%" },
  { value: 250, label: "2.5%" },
  { value: 300, label: "3%" },
  { value: 500, label: "5%" },
  { value: 1000, label: "10%" },
] as const;

export interface TokenMetadata {
  name: string;
  symbol: string;
  description?: string;
  image: string; // IPFS CID or URL
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface CreateTokenParams {
  name: string;
  symbol: string;
  meta: string; // IPFS CID
  taxRate: number; // basis points
  quoteAmt: bigint; // in wei
  beneficiary: `0x${string}`;
  devBuyAmount?: bigint;
}
