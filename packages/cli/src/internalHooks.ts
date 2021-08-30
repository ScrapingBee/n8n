import { Analytics } from "./analytics";
import * as analyticsHelpers from './analytics/helpers';
import { WorkflowEntity } from "./databases/entities/WorkflowEntity";

export class InternalHooks {
	private analytics: Analytics;

	constructor(analytics: Analytics) {
		this.analytics = analytics;
	}

	async onWorkflowSave(workflow: WorkflowEntity): Promise<void> {
		const nodesGraph = analyticsHelpers.generateNodesGraph(workflow);
		this.analytics.track('User saved workflow', { workflow_id: workflow.id.toString(), nodesGraph });
	}
}