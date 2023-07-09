export class ErrorBadRequestProducts extends Error {
	constructor() {
		super();
		this.name = 'ErrorBadRequestProducts';
	}
}

export class ErrorNotFoundProducts extends Error {
	constructor() {
		super();
		this.name = 'ErrorNotFoundProducts';
	}
}
