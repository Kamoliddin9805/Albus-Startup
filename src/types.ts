export type Marketplace = "yandex" | "uzum" | "ozon" | "wildberries";

export type Capability =
  | "read_products"
  | "read_orders"
  | "read_health"
  | "update_stock"
  | "update_price"
  | "create_product";

export interface SellerContext {
  sellerId: string;
  connectedMarketplaces: Marketplace[];
  permissions: Capability[];
}

export interface ActionRequest<TPayload = Record<string, unknown>> {
  marketplace: Marketplace;
  capability: Capability;
  payload: TPayload;
  idempotencyKey: string;
}

export interface ActionPreview {
  marketplace: Marketplace;
  capability: Capability;
  summary: string;
  warnings: string[];
}

export interface ActionResult<T = unknown> {
  ok: boolean;
  marketplace: Marketplace;
  data?: T;
  error?: string;
  auditId: string;
}

export interface DiagnosticItem {
  severity: "info" | "warning" | "critical";
  marketplace: Marketplace;
  code: string;
  message: string;
}
