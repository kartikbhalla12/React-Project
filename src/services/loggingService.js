import * as Sentry from '@sentry/browser';

function init() {
	Sentry.init({
		dsn:
			'https://fe81bb7f3a9a41b29fb0294f39991f0a@o393985.ingest.sentry.io/5243608',
	});
}

function log(error) {
	Sentry.captureException(error);
}

export { init, log };
