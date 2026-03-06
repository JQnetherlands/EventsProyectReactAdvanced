export class DomainError extends Error {
    constructor(code, message, meta = {}) {
        super(message);
        this.code = code;
        this.meta = meta;
    }
}

