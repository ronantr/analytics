export class ConversionFunnelsDto {
    id?: string;
    comment: string;
    companyName?: string;
    tags?: string[];

    constructor() {
        this.id = undefined;
        this.comment = '';
        this.companyName = '';
        this.tags = [];
    }
}