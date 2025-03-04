export default class Description {
	private value: string;

	constructor (name: string) {
		if (!(name.length < 32)) throw new Error("Invalid name");
		this.value = name;
	}

	public getValue () {
		return this.value;
	}
}