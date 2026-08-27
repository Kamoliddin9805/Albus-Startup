/*
 * PUBLIC EVALUATION REFERENCE ONLY
 *
 * This is a provider-agnostic contract used to demonstrate architecture.
 * Real Albus marketplace adapters, endpoints, payload mappings, validation,
 * authentication and marketplace-specific logic are intentionally private.
 */

import type {
  ActionPreview,
  ActionRequest,
  ActionResult,
  Capability,
  DiagnosticItem,
  Marketplace,
  SellerContext,
} from "../types";

export interface MarketplaceAdapter {
  readonly marketplace: Marketplace;
  readonly capabilities: ReadonlySet<Capability>;

  health(context: SellerContext): Promise<DiagnosticItem[]>;
  preview(context: SellerContext, request: ActionRequest): Promise<ActionPreview>;

  /**
   * Reference-only method. Production execution is intentionally not exposed
   * in this public repository.
   */
  executeReferenceExample(
    context: SellerContext,
    request: ActionRequest,
  ): Promise<ActionResult>;
}

export class AdapterRegistry {
  private readonly adapters = new Map<Marketplace, MarketplaceAdapter>();

  register(adapter: MarketplaceAdapter): void {
    this.adapters.set(adapter.marketplace, adapter);
  }

  get(marketplace: Marketplace): MarketplaceAdapter {
    const adapter = this.adapters.get(marketplace);
    if (!adapter) throw new Error("Reference marketplace adapter is unavailable.");
    return adapter;
  }

  supports(marketplace: Marketplace, capability: Capability): boolean {
    return this.get(marketplace).capabilities.has(capability);
  }
}
