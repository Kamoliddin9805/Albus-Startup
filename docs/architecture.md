# Albus Architecture

## Design goal

Albus is designed as a unified seller operating system rather than a set of independent marketplace screens. The same product, order, stock and action concepts are normalized behind a marketplace adapter layer.

## High-level components

### 1. Seller UI
Desktop and mobile interfaces expose a single operational workspace for products, orders, stock, diagnostics and AI commands.

### 2. AI Orchestrator
The orchestrator converts natural-language seller requests into read operations, diagnostics or structured action proposals. It does not bypass business rules.

### 3. Marketplace Adapter Layer
Each marketplace integration implements a common capability contract. This allows Albus to support Yandex Market, Uzum Market, Ozon and Wildberries without duplicating application logic throughout the product.

### 4. Action Layer
Write operations pass through validation, capability checks, authorization, preview, confirmation and idempotency protection before execution.

### 5. Audit and observability
Every controlled action should produce an auditable result. Production systems additionally require timeout handling, retries, rate-limit awareness and provider-specific error mapping.

## Request flow

```text
User request
   ↓
Intent / context resolution
   ↓
Capability registry
   ↓
Read-only query OR action proposal
   ↓
Validation
   ↓
Preview
   ↓
User confirmation
   ↓
Marketplace adapter
   ↓
Provider API
   ↓
Result + audit event
```

## Security principles

- Credentials stay server-side.
- Marketplace tokens are never exposed to the browser.
- Unsupported actions are rejected by the capability registry.
- Write actions require explicit confirmation where appropriate.
- Idempotency protects against duplicate execution.
- Production secrets and customer data are excluded from this public repository.

## Scaling direction

The adapter pattern allows new marketplaces to be added without redesigning the seller experience. The same architecture can later support Amazon, eBay, Shopify and regional commerce channels.
