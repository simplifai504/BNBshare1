# BNBShare - Réplica

Plataforma para lanzar tokens en BNB Chain con **fee sharing**, integrada con Flap.sh.

## Características

- **Crear tokens** en Flap.sh con tax configurable (0%, 1%, 2.5%, 3%, 5%, 10%)
- **Fee sharing**: dirige las comisiones de trading a una wallet beneficiaria
- **Listado de tokens** con filtros por plataforma
- **Claim**: reclama comisiones acumuladas (como beneficiario)
- **How to Claim**: guía para retirar fondos

## Stack técnico

- **Next.js 16** (App Router)
- **Tailwind CSS**
- **Wagmi v3** + **Viem** (Web3, BNB Chain)
- **Flap.sh** (creación de tokens, bonding curve)

## Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000).

## Configuración

- **Red**: BNB Chain (BSC)
- **Portal Flap**: `0xe2cE6ab80874Fa9Fa2aAE65D277Dd6B8e65C9De0`
- **API Upload**: `https://funcs.flap.sh/api/upload`

## Próximos pasos (mejoras)

1. **Login social** (Twitter, GitHub, etc.) para fee sharing por usuario
2. **Indexer** para listar tokens reales desde la blockchain
3. **Integración Four.meme** además de Flap.sh
4. **Claim real**: backend + DB para mapear beneficiarios y fondos
5. **Vanity addresses**: salt para direcciones que terminan en 8888/7777

## Documentación Flap.sh

- [Docs](https://docs.flap.sh)
- [Launch A Token](https://docs.flap.sh/flap/developers/launch-a-token)
- [Trade Tokens](https://docs.flap.sh/flap/developers/trade-tokens)
