## API Endpoint Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/private/user/nonce/generate` | POST | Generate nonce for login |
| `/v1/private/user/login/dex` | POST | User login to get access token |
| `/v1/private/token/upload` | POST | Upload token image |
| `/v1/private/token/create` | POST | Create token and get signature parameters |

## Complete API Flow

### 1. Get Nonce
**Endpoint**: `https://four.meme/meme-api/v1/private/user/nonce/generate`  
**Method**: POST  
**Parameters**:
```json
{
  "accountAddress": "user wallet address",
  "verifyType": "LOGIN",
  "networkCode": "BSC"
}
```
**Response**:
```json
{
  "code": "0",
  "data": "generated nonce value"
}
```

### 2. User Login
**Endpoint**: `https://four.meme/meme-api/v1/private/user/login/dex`  
**Method**: POST  
**Parameters**:
```json
{
  "region": "WEB",
  "langType": "EN",
  "loginIp": "",
  "inviteCode": "",
  "verifyInfo": {
    "address": "user wallet address",
    "networkCode": "BSC",
    "signature": "signature of 'You are sign in Meme {nonce}' signed with private key",
    "verifyType": "LOGIN"
  },
  "walletName": "MetaMask"
}
```
**Response**:
```json
{
  "code": "0",
  "data": "access_token"
}
```

### 3. Upload Token Image
**Endpoint**: `https://four.meme/meme-api/v1/private/token/upload`  
**Method**: POST  
**Headers**:
```
Content-Type: multipart/form-data
meme-web-access: {access_token}
```
**Parameters**:
- `file`: Image file data (supports jpeg, png, gif, bmp, webp formats)

**Response**:
```json
{
  "code": "0",
  "data": "uploaded image URL"
}
```

### 4. Create Token
**Endpoint**: `https://four.meme/meme-api/v1/private/token/create`  
**Method**: POST  
**Headers**:
```
meme-web-access: {access_token}
Content-Type: application/json
```

**Request Body Example**:
```json
{
  "name": "RELEASE",
  "shortName": "RELS",
  "desc": "RELEASE DESC",
  "imgUrl": "https://static.four.meme/market/...",
  "launchTime": 1740708849097,
  "label": "AI",
  "lpTradingFee": 0.0025,
  "webUrl": "https://example.com",
  "twitterUrl": "https://x.com/example",
  "telegramUrl": "https://telegram.com/example",
  "preSale": "0.1",
  "onlyMPC": false,
  "feePlan": false,
  "tokenTaxInfo": {
    "burnRate": 20,
    "divideRate": 30,
    "feeRate": 5,
    "liquidityRate": 40,
    "minSharing": 100000,
    "recipientAddress": "0x1234567890123456789012345678901234567890",
    "recipientRate": 10
  },
  "raisedToken": { ... }
}
```

**Response**:
```json
{
  "code": "0",
  "data": {
    "createArg": "encoded parameters for blockchain",
    "signature": "signature for blockchain transaction"
  }
}
```

### tokenTaxInfo Parameter Details

| Parameter | Description | Example Value | Notes |
|-----------|-------------|---------------|-------|
| feeRate | Trading fee rate | 5 | Fixed options: 1, 3, 5, or 10 (1%, 3%, 5%, 10%) |
| burnRate | Burn rate | 20 | Percentage (20 = 20%) |
| divideRate | Dividend distribution rate | 30 | Percentage |
| liquidityRate | Liquidity pool rate | 0 | Percentage |
| minSharing | Minimum for dividends | 100000 | minSharing = d × 10ⁿ (n ≥ 5, 1 ≤ d ≤ 9) |
| recipientAddress | Recipient address | "0x..." | Treasury address |
| recipientRate | Recipient allocation rate | 50 | Percentage |

**Sum:** burnRate + divideRate + liquidityRate + recipientRate must equal 100.

## Blockchain Interaction

Call `TokenManager2.createToken(createArg, sign)` with:
- `createArg`: API response createArg as byte array
- `sign`: API response signature as byte array
- `msg.value`: 0.01 BNB (buyFee) + preSale BNB
