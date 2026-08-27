/*
 * PUBLIC EVALUATION REFERENCE ONLY
 *
 * This file shows only a generic orchestration shape. Production Albus AI
 * routing, prompts, retrieval, marketplace context building, scoring and
 * decision logic are intentionally excluded.
 */

import type {
  ActionPreview,
  ActionRequest,
  DiagnosticItem,
  Marketplace,
  SellerContext,
} from "../types";
import { ActionLayer } from "./action-layer";
import { AdapterRegistry } from "./marketplace-adapter";

export class AiOrchestrator {
  constructor(
    private readonly registry: AdapterRegistry,
    private readonly actions: ActionLayer,
  ) {}

  async getTodayStatus(context: SellerContext): Promise<DiagnosticItem[]> {
    const results = await Promise.all(
      context.connectedMarketplaces.map((marketplace) =>
        this.registry.get(marketplace).health(context),
      ),
    );

    return results
      .flat()
      .sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity));
  }

  async planReferenceAction(
    context: SellerContext,
    request: ActionRequest,
  ): Promise<ActionPreview> {
    return this.actions.preview(context, request);
  }

  connectedChannels(context: SellerContext): Marketplace[] {
    return [...context.connectedMarketplaces];
  }
}

function severityWeight(value: DiagnosticItem["severity"]): number {
  if (value === "critical") return 3;
  if (value === "warning") return 2;
  return 1;
}
