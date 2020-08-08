import { Portion } from './portion';
import { ExtraPortionSpecial } from './extraPortionSpecial';
import { ExtraPortionPremium } from './extraPortionPremium';
import { DressingsOrder } from './dessingsOrder';

export class FriesOrder {
    constructor(
    // portion
    public portion: Portion,

    // extraPortions
    public extraPortion: boolean,
    public extraPortionsSpecial: ExtraPortionSpecial[],
    public extraPortionsPremium: ExtraPortionPremium[],

    // deressings
    public dressingsOrder: DressingsOrder,

    // price
    public price: number,
    ){}
    
}