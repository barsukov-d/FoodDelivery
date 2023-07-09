import { boot } from 'quasar/wrappers';

export default boot(async () => {
	if (process.env.NODE_ENV === 'development') {
		const loadMockServerWorker = async () =>
			await import('../mocks/client');

		const { mockServerWorker } = await loadMockServerWorker();

		mockServerWorker.start({
			onUnhandledRequest: 'bypass',
		});
	}
});
