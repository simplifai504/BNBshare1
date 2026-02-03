/**
 * Minimal Flap Portal ABI for token creation
 * Full ABI: https://docs.flap.sh/flap/developers/deployed-contract-addresses
 */

export const flapPortalAbi = [
  {
    inputs: [
      {
        components: [
          { name: "name", type: "string" },
          { name: "symbol", type: "string" },
          { name: "meta", type: "string" },
          { name: "dexThresh", type: "uint8" },
          { name: "salt", type: "bytes32" },
          { name: "taxRate", type: "uint16" },
          { name: "migratorType", type: "uint8" },
          { name: "quoteToken", type: "address" },
          { name: "quoteAmt", type: "uint256" },
          { name: "beneficiary", type: "address" },
          { name: "permitData", type: "bytes" },
          { name: "extensionID", type: "bytes32" },
          { name: "extensionData", type: "bytes" },
          { name: "dexId", type: "uint8" },
          { name: "lpFeeProfile", type: "uint8" },
        ],
        name: "params",
        type: "tuple",
      },
    ],
    name: "newTokenV4",
    outputs: [{ name: "token", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { name: "name", type: "string" },
          { name: "symbol", type: "string" },
          { name: "meta", type: "string" },
          { name: "dexThresh", type: "uint8" },
          { name: "salt", type: "bytes32" },
          { name: "taxRate", type: "uint16" },
          { name: "migratorType", type: "uint8" },
          { name: "quoteToken", type: "address" },
          { name: "quoteAmt", type: "uint256" },
          { name: "beneficiary", type: "address" },
          { name: "permitData", type: "bytes" },
          { name: "extensionID", type: "bytes32" },
          { name: "extensionData", type: "bytes" },
          { name: "dexId", type: "uint8" },
          { name: "lpFeeProfile", type: "uint8" },
          { name: "taxDuration", type: "uint64" },
          { name: "antiFarmerDuration", type: "uint64" },
          { name: "mktBps", type: "uint16" },
          { name: "deflationBps", type: "uint16" },
          { name: "dividendBps", type: "uint16" },
          { name: "lpBps", type: "uint16" },
          { name: "minimumShareBalance", type: "uint256" },
        ],
        name: "params",
        type: "tuple",
      },
    ],
    name: "newTokenV5",
    outputs: [{ name: "token", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
] as const;
