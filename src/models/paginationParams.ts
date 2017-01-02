interface IPaginationParams {
    offset : number;
    limit : number;
}

export const Defaults = {
    offset : 0,
    limit : 20,
    maxLimit : 100
}

export class PaginationParams implements IPaginationParams {
    offset : number = Defaults.offset;
    limit : number = Defaults.limit;

    constructor();
    constructor(offset: number, limit: number);
    constructor() {
        if (arguments.length == 2) {
            if (arguments[0] >= 0) {
                this.offset = arguments[0];
            }
            if (arguments[1] > 0) {
                if (arguments[1] <= Defaults.maxLimit) {
                    this.limit = arguments[1];
                } else {
                    this.limit = Defaults.maxLimit;
                }
            }
        }
    }
}