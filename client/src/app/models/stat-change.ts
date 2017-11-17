export class StatChange {
    beforePercent: number;
    afterPercent: number;
    min: number;
    max: number;
    name: string;

    constructor(name: string, beforePercent: number, afterPercent: number, min: number = 0, max: number = 5) {
        this.beforePercent = beforePercent;
        this.afterPercent = afterPercent;
        this.min = min;
        this.max = max;
        this.name = name;
    }
}