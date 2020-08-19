export class Location{
    constructor(
        public latitude: number,
        public longitude: number,
        public found: boolean,
        public address: string
    )
    {}
}