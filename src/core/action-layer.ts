/*
 * PUBLIC EVALUATION REFERENCE ONLY
 *
 * This file demonstrates a generic control pattern for startup evaluation.
 * It is NOT the Albus production action engine and intentionally excludes
 * production authorization, policy, persistence, audit, provider mappings,
 * retries, rate limits, workflows and commercial business rules.
 */

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
    this.validateReferenceRequest(context, request);
    return this.registry.get(request.marketplace).preview(context, request);
  }

  async executeReferenceExample(
    context: SellerContext,
    request: ActionRequest,
    confirmed: boolean,
  ): Promise<ActionResult> {
    this.validateReferenceRequest(context, request);

    if (!confirmed) {
      return {
        ok: false,
        marketplace: request.marketplace,
        error: "Confirmation required in this reference example.",
        auditId: crypto.randomUUID(),
      };
    }

    if (this.executedKeys.has(request.idempotencyKey)) {
      return {
        ok: false,
        marketplace: request.marketplace,
        error: "Duplicate reference action blocked.",
        auditId: crypto.randomUUID(),
      };
    }

    const result = await this.registry
      .get(request.marketplace)
      .executeReferenceExample(context, request);

    if (result.ok) this.executedKeys.add(request.idempotencyKey);
    return result;
  }

  private validateReferenceRequest(
    context: SellerContext,
    request: ActionRequest,
  ): void {
    if (!context.connectedMarketplaces.includes(request.marketplace)) {
      throw new Error("Marketplace is not connected in the reference context.");
    }

    if (!context.permissions.includes(request.capability)) {
      throw new Error("Reference capability is not permitted.");
    }

    if (!this.registry.supports(request.marketplace, request.capability)) {
      throw new Error("Reference capability is not supported.");
    }

    if (!request.idempotencyKey.trim()) {
      throw new Error("Reference idempotency key is required.");
    }
  }
}
