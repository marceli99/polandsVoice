import {PartyDisplayOrder} from "../PartiesData";

export default class MandatesCalculator {
    private readonly data: Array<any>;
    private mandates = new Map();
    private partiesPopularity: { [Identifier: string]: Array<number> } = {};
    private partiesAverageSupport: { [Identifier: string]: any } = {};

    constructor(data: Array<any>) {
        this.data = data;
        this.formatData();
        this.calculateAverageSupport();
    }

    getPartiesAverageSupport() {
        return this.partiesAverageSupport;
    }

    formatData() {
        this.data.forEach((poll: any) => {
            for (const value of poll.popularity.split(',')) {
                let [party, popularity] = value.split(':');
                if (!(party in this.partiesPopularity)) {
                    this.partiesPopularity[party] = [];
                }

                this.partiesPopularity[party].push(parseFloat(popularity));
            }
        });

        return this.partiesPopularity;
    }

    calculateAverageSupport() {
        Object.entries(this.partiesPopularity).forEach(([party, popularity]) => {
            let avgPopularity = popularity.reduce((a: number, b: number) => a + b) / popularity.length;
            this.partiesAverageSupport[party] = parseFloat(avgPopularity.toFixed(2));
        })

        return this.partiesAverageSupport;
    }

    calculateMandates() {
        // 1. Get parties that have the support of at least 5%.
        let partiesAboveThreshold: { [Identifier: string]: any } = {};

        Object.entries(this.partiesAverageSupport).forEach(([party, support]) => {
            if (support >= 5.0) {
                partiesAboveThreshold[party] = support
            }
        });

        // 2. Proportionally divide undecided votes and votes cast for parties below threshold.
        let proportionalSupport: { [Identifier: string]: any } = {};
        let totalSupport = Object.values(partiesAboveThreshold).reduce((a: number, b: number) => a + b);

        Object.entries(partiesAboveThreshold).forEach(([party, support]) => {
            proportionalSupport[party] = parseFloat((support / totalSupport * 100).toFixed(2));
        });

        // 4. Calculate mandates
        Object.entries(proportionalSupport).sort((a, b) => {
            if (PartyDisplayOrder.indexOf(a[0]) < PartyDisplayOrder.indexOf(b[0])) {
                return 1;
            }

            return -1;
        }).forEach(([party, popularity]) => {
            let formulaResult = (popularity / 100 * 460) + (popularity / 100 * Object.keys(proportionalSupport).length * 20.5) - 20.5;
            this.mandates.set(party, {seats: Math.round(formulaResult), popularity: this.partiesAverageSupport[party]});
        });

        return this.mandates;
    }
}
