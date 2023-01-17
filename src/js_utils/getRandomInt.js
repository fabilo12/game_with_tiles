export default function getRandomInt(min, max, n) {
	const minInt = Math.ceil(min);
	const maxInt = Math.floor(max);
	const nn = (n === undefined ? 1 : Math.min(maxInt-minInt,n));
	if ((maxInt-minInt) < nn) {
		throw new Error('Requested sample larger than integer range!')
	}
	const sample = Array(nn);
	for (let i = 0; i < nn; i++) {
		let filled = false;
		while (!filled) {
			const newRand = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
			if (sample.findIndex(el => el === newRand) === -1) {
				sample[i] = newRand;
				filled = true;
			}
		}
	}
	return sample;
}