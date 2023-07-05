export class Small {
	constructor(text) {
		this.text = text
		this.date = new Date()
		this.add = 'Add text'
	}
	toJSON() {
		return JSON.stringify({
			title: this.text,
			date: this.date,
			add: this.add,
			clock: 'asdad'
		})
	}
}
