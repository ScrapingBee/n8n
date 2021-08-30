import _Vue from "vue";
import {
	IAnalyticsSettings,
	IDataObject,
} from 'n8n-workflow';

import * as rudderanalytics from 'rudder-sdk-js';

declare module 'vue/types/vue' {
	interface Vue {
		$analytics: Analytics;
	}
}

export function AnalyticsPlugin(vue: typeof _Vue): void {
	const analytics = new Analytics();

	Object.defineProperty(vue, '$analytics', {
		get() { return analytics; },
	});
	Object.defineProperty(vue.prototype, '$analytics', {
		get() { return analytics; },
	});
}

class Analytics {

	private analytics?: any; // tslint:disable-line:no-any

	init(options: IAnalyticsSettings) {
		if (options.enabled && !this.analytics) {
			if(!options.config) {
				return;
			}

			rudderanalytics.load(options.config.key, options.config.url, { logLevel: 'DEBUG' });
			this.analytics = rudderanalytics;
		}
	}

	identify(event: string, properties?: IDataObject) {
		if (this.analytics) {
			this.analytics.identify(event, properties);
		}
	}

	track(event: string, properties?: IDataObject) {
		if (this.analytics) {
			this.analytics.track(event, properties);
		}
	}
}
