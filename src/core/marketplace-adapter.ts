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
  execute(context: SellerContext, request: ActionRequest): Promise<ActionResult>;
}

export class AdapterRegistry {
  private readonly adapters = new Map<Marketplace, MarketplaceAdapter>();

  register(adapter: MarketplaceAdapter): void {
    this.adapters.set(adapter.marketplace, adapter);
  }

  get(marketplace: Marketplace): MarketplaceAdapter {
    const adapter = this.adapters.get(marketplace);
    if (!adapter) {
      throw new Error(`Marketplace adapter is not registered: ${marketplace}`);
    }
    return adapter;
  }

  supports(marketplace: Marketplace, capability: Capability): boolean {
    return this.get(marketplace).capabilities.has(capability);
  }
}
