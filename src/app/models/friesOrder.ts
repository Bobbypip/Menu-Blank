import { Portion } from './portion';
import { ExtraPortion } from './extraPortion';
import { DressingsOrder } from './dessingsOrder';

export class FriesOrder {
    constructor(
    public fiD: number,
    // portion
    public fPortion: Portion,

    // extraPortions
    public fExtraPortion: boolean,
    public fExtraPortions: ExtraPortion[],

    // deressings
    public fDressingsOrder: DressingsOrder,

    // price
    public fPrice: number,
    ){}
}