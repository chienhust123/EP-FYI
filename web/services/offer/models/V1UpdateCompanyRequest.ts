export type V1UpdateCompanyRequest = {
    /**
     * @type string | undefined, uint64
    */
    id?: string;
    /**
     * @description If provided, will update the company\'s name.
     * @type string | undefined
    */
    name?: string;
    /**
     * @description If provided, will update the company\'s profile image.
     * @type string | undefined, uint64
    */
    companyProfileImageId?: string;
};