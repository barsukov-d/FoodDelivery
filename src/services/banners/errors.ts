export class ErrorBadRequestBanners extends Error {
	constructor() {
		super();
		this.name = 'ErrorBadRequestBanners';
	}
}

export class ErrorNotFoundBanners extends Error {
	constructor() {
		super();
		this.name = 'ErrorNotFoundBanners';
	}
}
