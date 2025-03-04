
export default class Type {
	private value: string;

	constructor (type: string) {
        const types = ["income","expense","card"];
		if (!types.includes(type)) throw new Error("Invalid enter");
		this.value = type;
	}

	public getValue (): string {
		return this.value;
	}
}