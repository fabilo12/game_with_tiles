export default function sumArray(numArray) {
	return (
		numArray.reduce((acc, x) => acc + x, 0)
	);
}