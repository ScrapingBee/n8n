import * as analyticsHelpers from './analytics/helpers';
import { Analytics } from "./analytics";
import { IInternalHooksClass } from "./Interfaces";
import { WorkflowEntity } from "./databases/entities/WorkflowEntity";

export class InternalHooks implements IInternalHooksClass {
	private analytics: Analytics;

	constructor(analytics: Analytics) {
		this.analytics = analytics;
	}

	async onServerStarted(): Promise<void> {
		this.analytics.track('Instance started');
	}

	async onWorkflowSave(workflow: WorkflowEntity): Promise<void> {
		const nodesGraph = analyticsHelpers.generateNodesGraph(workflow);
		this.analytics.track('User saved workflow', { workflow_id: workflow.id.toString(), nodesGraph });
	}
}