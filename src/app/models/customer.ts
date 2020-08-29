export class Customer{
    constructor(
        public latitude: number,
        public longitude: number,
        public found: boolean,
        public address: string,
        public manualAddress: string,
        public name: string
    )
    {}
}