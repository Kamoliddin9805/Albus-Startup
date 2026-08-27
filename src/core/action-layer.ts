import type {
  ActionPreview,
  ActionRequest,
  ActionResult,
  SellerContext,
} from "../types";
import { AdapterRegistry } from "./marketplace-adapter";

export class ActionLayer {
  private readonly executedKeys = new Set<string>();

  constructor(private readonly registry: AdapterRegistry) {}

  async preview(
    context: SellerContext,
    request: ActionRequest,
  ): Promise<ActionPreview> {
    this.validate(context, request);
    return this.registry.get(request.marketplace).preview(context, request);
  }

  async execute(
    context: SellerContext,
    request: ActionRequest,
    confirmed: boolean,
  ): Promise<ActionResult> {
    this.validate(context, request);

    if (!confirmed) {
      return {
        ok: false,
        marketplace: request.marketplace,
        error: "User confirmation is required before write execution.",
        auditId: crypto.randomUUID(),
      };
    }

    if (this.executedKeys.has(request.idempotencyKey)) {
      return {
        ok: false,
        marketplace: request.marketplace,
        error: "Duplicate action blocked by idempotency protection.",
        auditId: crypto.randomUUID(),
      };
    }

    const result = await this.registry
      .get(request.marketplace)
      .execute(context, request);

    if (result.ok) {
      this.executedKeys.add(request.idempotencyKey);
    }

    return result;
  }

  private validate(context: SellerContext, request: ActionRequest): void {
    if (!context.connectedMarketplaces.includes(request.marketplace)) {
      throw new Error(`Marketplace is not connected: ${request.marketplace}`);
    }

    if (!context.permissions.includes(request.capability)) {
      throw new Error(`Permission denied for capability: ${request.capability}`);
    }

    if (!this.registry.supports(request.marketplace, request.capability)) {
      throw new Error(
        `Capability ${request.capability} is not supported by ${request.marketplace}`,
      );
    }

    if (!request.idempotencyKey.trim()) {
      throw new Error("Idempotency key is required.");
    }
  }
}
