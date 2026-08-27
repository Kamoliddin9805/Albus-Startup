# Albus — Startup Evaluation Guide

This repository is a public, sanitized showcase prepared for startup and technical evaluation.

## 3-minute review path

### 1. Understand the problem
Marketplace sellers manage products, stock, prices, orders and operational issues across several disconnected seller cabinets.

### 2. Understand the solution
Albus provides one AI-assisted operating workspace across multiple marketplaces, with a unified seller experience and controlled marketplace operations.

### 3. Review the product scope
See [`docs/product.md`](docs/product.md) for the target users, product modules, customer value and commercial model.

### 4. Review the engineering approach
See [`docs/architecture.md`](docs/architecture.md) for the public system boundaries and engineering principles.

### 5. Review the reference code
The [`src/`](src/) directory contains selected, non-production TypeScript reference code that demonstrates the architectural direction without publishing private marketplace integrations or commercial business logic.

## Startup snapshot

| Item | Status |
|---|---|
| Product | Albus — AI Multi-Marketplace Seller OS |
| Stage | MVP |
| Primary market | Uzbekistan |
| Expansion | Central Asia / CIS |
| Business model | SaaS subscription |
| Initial marketplaces | Yandex Market, Uzum Market, Ozon, Wildberries |
| Website | https://albus.mobi |

## Main differentiation

Albus is designed as a **Seller Operating System**, combining:

- multi-marketplace operations;
- AI-assisted product workflows;
- seller diagnostics;
- natural-language assistance;
- controlled actions rather than unrestricted AI writes.

## Why the full code is not public

The production codebase contains marketplace-specific integrations, credentials, AI prompts, proprietary mappings, validation rules, customer data structures and commercial know-how. Publishing those materials is not required to demonstrate the startup and would create unnecessary security and intellectual-property risk.

This public repository therefore demonstrates **product depth and technical direction while preserving production confidentiality**.

## Evaluation note

The public code is illustrative and sanitized. The live product and private production repository are the authoritative implementation of Albus.
