# Tax Token Contract API Documentation

## Overview

Tax Token is an advanced ERC20 token contract supporting transaction fees, reward distribution, and multiple allocation modes.

**Key Features:**
- Transaction fee mechanism: Charges a certain percentage of fees on buy/sell transactions
- Reward distribution mechanism: Token holders receive reward distributions based on their holdings
- Multiple allocation modes: Fees can be allocated to founder, holders, burn, and liquidity
- Anti-sniper protection: Prevents malicious addresses from participating in rewards through blacklist mechanism

## Rate Sum

The sum of `rateFounder`, `rateHolder`, `rateBurn`, and `rateLiquidity` must equal 100.

(API uses: recipientRate → founder, divideRate → holder, burnRate, liquidityRate.)

## Events

### FeeDispatched

Emitted when fees are dispatched and allocated.

- amountFounder, amountHolder, amountBurn, amountLiquidity (token amounts)
- quoteFounder, quoteHolder (quote token amounts)

Use for indexer: attribute tax received per token → creator in ledger.

### FeeClaimed

Emitted when rewards are claimed by a user (account, amount).

## Key view functions

- `claimableFee(address account)` – claimable quote token amount
- `claimedFee(address account)` – already claimed amount
- `claimFee()` – claim rewards (caller)
- `founder` – address receiving founder/recipient allocation
- `feeRate`, `rateFounder`, `rateHolder`, `rateBurn`, `rateLiquidity`, `minShare`
