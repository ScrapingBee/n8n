<template>
	<fragment></fragment>
</template>

<script lang="ts">
import Vue from 'vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
	name: 'Analytics',
	computed: {
		...mapGetters(['analytics']),
	},
	watch: {
		analytics(opts) {
			if (opts.enabled) {
				this.$analytics.init(opts);
			}
		},
	},
});
</script>
