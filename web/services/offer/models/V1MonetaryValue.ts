export type V1MonetaryValue = {
    /**
     * @description The amount of the monetary value, represented in the Inflated Integer format with multiplier of 10^5.
     * @type string | undefined, uint64
    */
    amount?: string;
    /**
     * @description The 3-letter ISO currency code of the currency denoting the monetary value.
     * @type string | undefined
    */
    currency?: string;
};