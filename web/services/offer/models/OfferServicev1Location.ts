export type OfferServicev1Location = {
    /**
     * @type string | undefined, uint64
    */
    id?: string;
    /**
     * @description The 2-letter ISO country code of the country of the location.
     * @type string | undefined
    */
    country?: string;
    /**
     * @description Optional, the name of the state of the location.
     * @type string | undefined
    */
    state?: string;
    /**
     * @description The name of the city of the location.
     * @type string | undefined
    */
    city?: string;
};