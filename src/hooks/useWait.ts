import { injectStrict } from 'src/utils/inject';
import { VueWaitKey } from 'src/boot/wait';

export const useWait = () => {
	const $w = injectStrict(VueWaitKey);

	return $w;
};
