export default function addArrays(numArray, addedArray) {
	return (
		numArray.map((x, i) => x + addedArray[i])
	);
}