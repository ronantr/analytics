export class TagsDto {
    id?: string;
    comment: string;
    companyName?: string;

    constructor() {
        this.id = undefined;
        this.comment = '';
        this.companyName = '';
    }
}
