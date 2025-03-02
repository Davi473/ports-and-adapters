export default class Amount {
	private value: number;

	constructor (name: number) {
		if (!name) throw new Error("Invalid name");
		this.value = name;
	}

	public getValue (): number {
		return this.value;
	}
}