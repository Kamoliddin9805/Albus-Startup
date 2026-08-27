# Albus — Multi-Marketplace Seller OS

**AI-powered operating system for marketplace sellers.**

Albus is a SaaS platform designed to help sellers manage multiple marketplaces from one workspace. The product combines marketplace integrations, AI-assisted product content, operational diagnostics and a controlled action layer.

> This public repository contains a **sanitized startup showcase and reference implementation**. Production credentials, private integrations, customer data and commercial source code are intentionally excluded.

## Problem

Marketplace sellers often work with several disconnected seller cabinets. Product cards, categories, attributes, prices, stock and orders must be managed separately for every platform. This increases manual work, operational errors and the risk of cancelled orders or poor listing quality.

## Solution

Albus brings marketplace operations into one interface and uses AI to reduce repetitive work.

Core capabilities:

- Multi-marketplace workspace
- AI-assisted product card creation and modernization
- Product attribute and category enrichment
- Price and stock management
- Order monitoring and operational diagnostics
- Marketplace health overview
- Controlled AI Action Layer with validation, confirmation and auditability

## Target marketplaces

- Yandex Market
- Uzum Market
- Ozon
- Wildberries

Future expansion may include Amazon, eBay and Shopify.

## How Albus works

```text
Seller
  ↓
Albus Web / Mobile UI
  ↓
AI Orchestrator
  ├── Product Content Engine
  ├── Marketplace Diagnostics
  └── Action Planner
  ↓
Validation + Permission + Confirmation
  ↓
Marketplace Adapter Layer
  ├── Yandex Market
  ├── Uzum Market
  ├── Ozon
  └── Wildberries
  ↓
Marketplace APIs
```

## Safety-first Action Layer

Albus is designed so that AI does not directly execute sensitive marketplace actions without controls.

A write action follows this flow:

1. Intent detection
2. Capability check
3. Input validation
4. Permission check
5. Preview generation
6. User confirmation
7. Idempotent execution
8. Audit result

This architecture helps reduce accidental or duplicate operations.

## Repository structure

```text
src/
  core/
    marketplace-adapter.ts
    ai-orchestrator.ts
    action-layer.ts
  types.ts
  index.ts
docs/
  architecture.md
  product.md
```

## Reference code

The TypeScript files in this repository demonstrate the core architecture used by Albus at a high level. They are intentionally provider-agnostic and contain no API keys or private production endpoints.

## MVP stage

Albus is currently positioned at the **MVP stage**: the product concept and core workflows are implemented and marketplace integrations are being unified and hardened for pilot usage.

## Business model

Albus follows a SaaS subscription model based on usage, connected marketplace accounts, product volume and automation capabilities. B2B plans can be configured for larger sellers and agencies.

## Vision

**One seller. Multiple marketplaces. One operating system.**

Albus aims to become the AI-native operating layer for marketplace commerce in Uzbekistan and then expand to Central Asia and wider CIS markets.

## Website

https://albus.mobi

## Security

No secrets, marketplace tokens, customer information or production credentials are stored in this public repository.

## License

This public showcase is provided for evaluation and demonstration purposes. Production Albus source code and commercial integrations remain proprietary.
