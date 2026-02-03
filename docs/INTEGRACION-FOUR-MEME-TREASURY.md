# Integración técnica: BNBshare con Tax Tokens de Four.Meme + Treasury compartida

Este documento esboza la integración para crear tokens en **Four.Meme** (Free Mode, Tax Tokens) con **100% del tax** enviado a una **treasury compartida**, y un ledger interno para el claim por usuario (ej. por Twitter).

---

## 1. Resumen del flujo

```
Usuario (wallet + opcional Twitter)
    → Crear token en Four.Meme (Tax habilitado, recipient = treasury)
    → API Four.Meme devuelve createArg + signature
    → Tx on-chain: TokenManager2.createToken(createArg, sign)
    → Guardar en DB: tokenAddress, creatorId (wallet o Twitter), treasuryAddress

Tax post-graduation
    → Four.Meme envía el tax a la dirección treasury
    → Indexer o eventos: atribuir ingresos por token → creatorId
    → Ledger: balance por usuario

Claim
    → Usuario inicia sesión (Twitter/wallet)
    → Ver balance (ledger)
    → Solicitar retiro → backend envía desde treasury a la dirección del usuario
```

---

## 2. Configuración base

### 2.1 Treasury

- **Una wallet** (EOA o multisig) que será el **Funds Recipient** de todos los tokens creados vía BNBshare.
- Esa misma wallet recibe los envíos de claim (retiros).
- Guardar en env: `TREASURY_PRIVATE_KEY` y `TREASURY_ADDRESS` (para firmar txs de claim).

### 2.2 Four.Meme – Referencias oficiales

| Recurso | URL |
|--------|-----|
| Protocol Integration | https://four-meme.gitbook.io/four.meme/brand/protocol-integration |
| API Create Token (descarga) | En Protocol Integration: "API-CreateToken.30-10-2025.md" |
| TokenManager2.lite.abi | En Protocol Integration o [fourMemeLauncher/docs](https://github.com/slightlyuseless/fourMemeLauncher/tree/main/docs) |
| Tax Tokens (guía producto) | https://four-meme.gitbook.io/four.meme/guide/introducing-tax-tokens-on-four.meme |

- **Red:** BSC (BNB Chain).  
- **TokenManager2:** dirección en BSC según documentación oficial (ej. en fourMemeLauncher se usa `0x5c952063c7fc8610FFDB798152D69F0B9550762b`; verificar en four.meme).

---

## 3. API Four.Meme – Flujo de creación de token

El flujo estándar (sin tax) está documentado en el repo [fourMemeLauncher](https://github.com/slightlyuseless/fourMemeLauncher); para **Tax Tokens** hay que incluir en el payload de create los parámetros de tax (ver apartado 4).

### 3.1 Auth (login con wallet)

1. **Generar nonce**  
   - `POST https://four.meme/meme-api/v1/private/user/nonce/generate`  
   - Body: `{ "accountAddress": "<wallet>", "verifyType": "LOGIN", "networkCode": "BSC" }`  
   - Respuesta: `data` = nonce.

2. **Login**  
   - Firmar con la wallet del usuario el mensaje: `You are sign in Meme {nonce}`.  
   - `POST https://four.meme/meme-api/v1/private/user/login/dex`  
   - Body incluye `verifyInfo.signature`, `verifyInfo.address`, `verifyInfo.networkCode: "BSC"`, `verifyType: "LOGIN"`.  
   - Respuesta: `data` = `access_token`.  
   - Usar header `meme-web-access: {access_token}` en todas las llamadas privadas.

### 3.2 Subir imagen del token

- `POST https://four.meme/meme-api/v1/private/token/upload`  
- Headers: `meme-web-access`, `Content-Type: multipart/form-data`  
- Body: `file` = imagen (jpeg, png, gif, bmp, webp).  
- Respuesta: `data` = URL de la imagen (usar como `imgUrl` en create).

### 3.3 Preparar creación (create token)

- `POST https://four.meme/meme-api/v1/private/token/create`  
- Headers: `meme-web-access: {access_token}`  
- Body: payload de creación (ver tabla siguiente).  
- Respuesta: devuelve **createArg** y **signature** (bytes/hex) para la tx on-chain.

Parámetros estándar (según API-CreateToken disponible en fourMemeLauncher):

| Parámetro   | Descripción        | Ejemplo / nota |
|------------|--------------------|-----------------|
| name       | Nombre del token   | string          |
| shortName  | Símbolo            | string          |
| desc       | Descripción        | string          |
| imgUrl     | URL de imagen (upload) | obligatorio desde su API |
| launchTime | Timestamp de lanzamiento | ms |
| label      | Categoría          | Meme, AI, Defi, Games, Infra, De-Sci, Social, Depin, Charity, Others |
| webUrl     | Web (opcional)     | string          |
| twitterUrl | Twitter (opcional) | string          |
| telegramUrl| Telegram (opcional)| string          |
| preSale    | BNB de presale     | "0" o "0.1" etc. |
| onlyMPC    | Solo Binance MPC   | false para nuestro caso |
| raisedToken| Config de token base | obtener de `GET https://four.meme/meme-api/v1/public/config` (ej. BNB) |

Los parámetros fijos que suele devolver la API (totalSupply, raisedAmount, saleRate, etc.) no hace falta enviarlos si la API los rellena; lo importante es enviar **tax** y **recipient**.

---

## 4. Parámetros para Tax Token (100% a treasury)

En el body de `POST /v1/private/token/create` se usa el objeto **tokenTaxInfo**. Para 100% a treasury:

| Campo | Descripción | Valor BNBshare |
|-------|-------------|----------------|
| feeRate | % fee por trade (post-graduation) | `1`, `3`, `5` o `10` |
| burnRate | % a burn | `0` |
| divideRate | % a dividendos | `0` |
| liquidityRate | % a liquidez | `0` |
| recipientRate | % al recipient | `100` |
| recipientAddress | Dirección treasury | `TREASURY_ADDRESS` |
| minSharing | Mín. tokens para dividendos | `100000` (si divideRate=0 no importa) |

**Regla:** `burnRate + divideRate + liquidityRate + recipientRate` = 100. Modo Free Mode (Tax no disponible en X Mode). Referencia: [Introducing Tax Tokens](https://four-meme.gitbook.io/four.meme/guide/introducing-tax-tokens-on-four.meme).

Los nombres de los campos son los del objeto **tokenTaxInfo** (ver `docs/API-CreateToken.02-02-2026.md`). Los nombres exactos (ej. `enableTax`, `taxRate`, `taxRecipientAddress`, `taxAllocationRecipient`) hay que tomarlos de:

- El documento oficial **API-CreateToken.30-10-2025.md** (descarga desde [Protocol Integration](https://four-meme.gitbook.io/four.meme/brand/protocol-integration)), o  
- Inspeccionar el payload que envía la web de four.meme al crear un token con “Enable Tax” (DevTools → Network → request a `/v1/private/token/create`).

Ejemplo **conceptual** de lo que deberías enviar (ajustar nombres según API real):

```json
"tokenTaxInfo": {
  "feeRate": 5,
  "burnRate": 0,
  "divideRate": 0,
  "liquidityRate": 0,
  "recipientRate": 100,
  "recipientAddress": "0xTU_TREASURY_ADDRESS",
  "minSharing": 100000
}
```

Incluir en el body además: `lpTradingFee: 0.0025`, `feePlan: false`, y `raisedToken` desde `GET /v1/public/config`. Documentación completa: `docs/API-CreateToken.02-02-2026.md`.

---

## 5. Transacción on-chain: createToken

- **Contrato:** TokenManager2 (BSC).  
- **Método:** `createToken(bytes args, bytes signature)`.
- **Parámetros:**
  - `args`: el **createArg** que devolvió la API (convertido a `bytes`/hex según espere el cliente).
  - `signature`: la **signature** que devolvió la API.
- **value (msg.value):**  
  - Fee de creación (ej. 0.01 BNB según config de raisedToken en `/v1/public/config`).  
  - Más el `preSale` en BNB.  
  - Ejemplo: `value = 0.01 + preSale` en wei.

El **createArg** ya viene codificado desde la API (incluye template, supply, launchTime, etc.); si en el body del create incluyes tax y recipient, el backend de Four.Meme debería codificarlos dentro de ese `createArg`. No es necesario codificar a mano la estructura si usas su API.

Después de la tx:

- Escuchar evento **TokenCreate** del contrato para obtener la dirección del token (`token`).  
- Guardar en tu base de datos: `tokenAddress`, `creatorId` (wallet o id de Twitter), `treasuryAddress`, `createdAt`, etc., para el ledger y el claim.

---

## 6. Ledger y atribución de tax a usuarios

- Todo el tax (post-graduation) va a **una sola dirección**: la treasury.
- Para saber **cuánto corresponde a cada usuario** hace falta atribuir ingresos por **token** (cada token está ligado a un creator en tu DB).

Opciones:

1. **Indexer / subgraph:**  
   Indexar eventos de Four.Meme (o del token graduado) que indiquen “tax enviado a treasury” y el token asociado. Por cada tal evento, actualizar el balance del creator en tu ledger (por token → creatorId).

2. **Balance de la treasury en BNB (y tokens):**  
   Si Four.Meme convierte el tax en BNB y lo envía a la treasury, puedes aproximar “ingresos por periodo” y repartir según proporción de volumen por token (más complejo y menos preciso).

3. **MVP:**  
   Registrar solo “token T creado por user U”. Cuando tengas indexer o datos on-chain de tax recibido por token, sumar al balance de U. Mientras tanto, un “balance” manual o importado para pruebas.

Estructura de ledger sugerida (ejemplo):

- `user_id` (o twitter_id, wallet)
- `token_address`
- `balance_wei` (o en BNB)
- `last_updated`
- `claimed_wei`

Al “claim”, restar de balance y registrar en `claimed_wei` (o tabla de withdrawals).

---

## 7. Claim (retiro desde treasury)

1. Usuario inicia sesión (Twitter o wallet).
2. Backend consulta el ledger y devuelve el balance disponible para ese usuario.
3. Usuario indica dirección de destino (MetaMask, exchange, etc.) y opcionalmente cantidad.
4. Backend:
   - Comprueba que balance ≥ cantidad y que la dirección es BEP-20 válida.
   - Firma y envía una tx **desde la treasury** hacia la dirección del usuario (BNB o el token que repartáis).
   - Actualiza el ledger (resta cantidad, registra el withdrawal).
5. Recomendaciones (como en BNBshare): mantener ~0.01 BNB en treasury para gas, solo BSC (BEP-20), posible mínimo de claim para evitar gastar gas en cantidades mínimas.

---

## 8. Checklist de implementación

- [ ] Crear/definir wallet treasury; guardar `TREASURY_ADDRESS` y `TREASURY_PRIVATE_KEY` (o signer seguro).
- [x] **tokenTaxInfo** documentado: feeRate (1/3/5/10), recipientRate 100, recipientAddress = treasury, burn/divide/liquidity 0 (ver `docs/API-CreateToken.02-02-2026.md`).
- [ ] Implementar cliente API Four.Meme: nonce → login → upload → create (con tax 100% a treasury).
- [ ] Integrar TokenManager2 en BSC: `createToken(createArg, sign)` con `value` correcto; escuchar TokenCreate.
- [ ] DB: tablas para tokens (tokenAddress, creatorId, treasury), ledger (user, token, balance, claimed).
- [ ] Lógica de atribución: indexer o manual por token → actualizar ledger.
- [ ] Endpoint y UI de claim: consultar balance, solicitar retiro, enviar tx desde treasury, actualizar ledger.

---

## 9. Referencias rápidas

- **API base:** `https://four.meme/meme-api`  
- **Config pública (raisedToken, fees):** `GET https://four.meme/meme-api/v1/public/config`  
- **TokenManager2 (ejemplo, verificar en four.meme):** `0x5c952063c7fc8610FFDB798152D69F0B9550762b` (BSC)  
- **Tax Tokens:** Free Mode, Enable Tax, 1/3/5/10%, allocation 100% Funds Recipient = treasury.  
- **ABI mínimo:** [TokenManager2.lite.abi](https://github.com/slightlyuseless/fourMemeLauncher/blob/main/docs/TokenManager2.lite.abi) – usar al menos `createToken(bytes,bytes)` y evento `TokenCreate`.

Con esto puedes implementar la integración técnica de BNBshare sobre Four.Meme con Tax Tokens y treasury compartida. Si más adelante tienes el payload real de create con tax, se puede añadir aquí como anexo o actualizar la sección 4.
