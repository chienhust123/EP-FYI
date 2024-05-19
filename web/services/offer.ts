/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OfferServicev1Location {
  /** @format uint64 */
  id?: string;
  /** The 2-letter ISO country code of the country of the location. */
  country?: string;
  /** Optional, the name of the state of the location. */
  state?: string;
  /** The name of the city of the location. */
  city?: string;
}

export interface ProtobufAny {
  '@type'?: string;
  [key: string]: any;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export interface V1AggregatedCompanyStats {
  company?: V1Company;
  /** @format uint64 */
  totalSubmissionCount?: string;
}

/** Filter options when listing aggregated company statistics. Entries must match all of the provided conditions to be returned in the final result. */
export interface V1AggregatedCompanyStatsFilterOptions {
  /** The company name to search for. The company's name must match the provided query using full-text index search. */
  companyNameQuery?: string;
  /**
   * The list of country ISO codes where the offers were extended from.
   * The company must have at least one aggregated offer information belonging to one of the provided countries.
   */
  countryList?: string[];
  /**
   * The list of state names where the offers were extended from.
   * The company must have at least one aggregated offer information belonging to one of the provided states.
   */
  stateList?: string[];
  /**
   * The list of city names where the offers were extended from.
   * The company must have at least one aggregated offer information belonging to one of the provided cities.
   */
  cityList?: string[];
  /**
   * The list of position titles of the requested offers.
   * The company must have at least one aggregated offer information matching one of the provided title using full-text index search.
   */
  positionTitleList?: string[];
  /**
   * The list of position level codes of the requested offers.
   * The company must have at least one aggregated offer information matching one of the provided level codes.
   */
  positionLevelList?: string[];
}

/**
 *  - VALUE_ID_ASCENDING: Sort offer by ascending company ID.
 *  - VALUE_ID_DESCENDING: Sort offer by descending company ID.
 *  - VALUE_NAME_ASCENDING: Sort offer by ascending company name first, ascending company ID second.
 *  - VALUE_NAME_DESCENDING: Sort offer by descending company name first, descending company ID second.
 * @default "VALUE_UNSPECIFIED"
 */
export enum V1AggregatedCompanyStatsSortOrderValue {
  VALUE_UNSPECIFIED = 'VALUE_UNSPECIFIED',
  VALUE_ID_ASCENDING = 'VALUE_ID_ASCENDING',
  VALUE_ID_DESCENDING = 'VALUE_ID_DESCENDING',
  VALUE_NAME_ASCENDING = 'VALUE_NAME_ASCENDING',
  VALUE_NAME_DESCENDING = 'VALUE_NAME_DESCENDING',
}

export interface V1Company {
  /** @format uint64 */
  id?: string;
  name?: string;
  profileImageUrl?: string;
}

/**
 *  - VALUE_LOCATION_ASCENDING: Sort offer by ascending country first, then ascending state, ascending city and aseconding ID.
 *  - VALUE_LOCATION_DESCENDING: Sort offer by descending country first, then descending state, descending city and descending ID.
 *  - VALUE_POSITION_ASCENDING: Sort offer by ascending position name first, ascending ID second.
 *  - VALUE_POSITION_DESCENDING: Sort offer by descending position name first, descending ID second.
 * @default "VALUE_UNSPECIFIED"
 */
export enum V1CompanyAggregatedOfferStatsSortOrderValue {
  VALUE_UNSPECIFIED = 'VALUE_UNSPECIFIED',
  VALUE_LOCATION_ASCENDING = 'VALUE_LOCATION_ASCENDING',
  VALUE_LOCATION_DESCENDING = 'VALUE_LOCATION_DESCENDING',
  VALUE_POSITION_ASCENDING = 'VALUE_POSITION_ASCENDING',
  VALUE_POSITION_DESCENDING = 'VALUE_POSITION_DESCENDING',
}

export interface V1CompanyProfileImage {
  /** @format uint64 */
  id?: string;
  presignPutUrl?: string;
}

export type V1CreateCompanyProfileImageRequest = object;

export interface V1CreateCompanyProfileImageResponse {
  image?: V1CompanyProfileImage;
}

/** Request payloads */
export interface V1CreateCompanyRequest {
  name?: string;
  /** @format uint64 */
  companyProfileImageId?: string;
}

export interface V1CreateCompanyResponse {
  company?: V1Company;
}

export type V1CreateOfferImageRequest = object;

export interface V1CreateOfferImageResponse {
  image?: V1OfferImage;
}

export interface V1CreateOfferRequest {
  /**
   * If the company ID is provided and exists inside the database, the newly created offer will be associated to that company.
   * Otherwise, if the company name is provided, Offer Core Service will try to match it with an existing company inside the database.
   * If none is found, then a new company record is created inside the database.
   */
  company?: V1Company;
  /**
   * If the location ID is provided and exists inside the database, the newly created offer will be associated to that location.
   * Otherwise, Offer Core Service will try to match the location's country, state and city with an existing location inside the database.
   * If none is found, then a new location record is created inside the database.
   */
  location?: OfferServicev1Location;
  /**
   * If the position ID is provided and exists inside the database, the newly created offer will be associated to that position.
   * Otherwise, Offer Core Service will try to match the position's title and level with an existing position inside the database.
   * If none is found, then a new position record is created inside the database.
   */
  position?: V1Position;
  totalPackage?: V1MonetaryValue;
  /**
   * Must be an image ID returned by the CreateOfferImage API, and the presigned URL associated with that image inside our database must
   * have an image uploaded to it.
   * @format uint64
   */
  imageId?: string;
}

export interface V1CreateOfferResponse {
  offer?: V1Offer;
}

export interface V1GetAggregatedCompanyStatsListRequest {
  /** @format uint64 */
  companyId?: string;
  companyName?: string;
  /**
   *  - VALUE_ID_ASCENDING: Sort offer by ascending company ID.
   *  - VALUE_ID_DESCENDING: Sort offer by descending company ID.
   *  - VALUE_NAME_ASCENDING: Sort offer by ascending company name first, ascending company ID second.
   *  - VALUE_NAME_DESCENDING: Sort offer by descending company name first, descending company ID second.
   */
  sortOrder?: V1AggregatedCompanyStatsSortOrderValue;
  /** @format uint64 */
  limit?: string;
}

export interface V1GetAggregatedCompanyStatsListResponse {
  companyStatList?: V1AggregatedCompanyStats[];
  /** @format uint64 */
  previousCompanyId?: string;
  previousCompanyName?: string;
  /** @format uint64 */
  nextCompanyId?: string;
  nextCompanyName?: string;
}

export interface V1GetCompanyAggregatedOfferStatsListsRequest {
  /** @format uint64 */
  locationId?: string;
  positionName?: string;
  /**
   *  - VALUE_LOCATION_ASCENDING: Sort offer by ascending country first, then ascending state, ascending city and aseconding ID.
   *  - VALUE_LOCATION_DESCENDING: Sort offer by descending country first, then descending state, descending city and descending ID.
   *  - VALUE_POSITION_ASCENDING: Sort offer by ascending position name first, ascending ID second.
   *  - VALUE_POSITION_DESCENDING: Sort offer by descending position name first, descending ID second.
   */
  sortOrder?: V1CompanyAggregatedOfferStatsSortOrderValue;
  /** @format uint64 */
  limit?: string;
  /** The 3-letter ISO currency code of the currency denoting the currency to return the aggregated offer stats in. */
  baseCurrency?: string;
}

export interface V1GetCompanyAggregatedOfferStatsListsResponse {
  offerStatList?: V1AggregatedCompanyStats[];
  /** @format uint64 */
  previousLocationId?: string;
  previousPositionId?: string;
  /** @format uint64 */
  nextLocationId?: string;
  nextPositionId?: string;
}

export interface V1GetOfferListRequest {
  /** Filter options when listing offers. Offers must match all of the provided conditions to be returned in the final result. */
  filterOptions?: V1OfferListFilterOptions;
  /**
   *  - VALUE_CREATED_TIME_ASCENDING: Sort offer by ascending created time first, ascending ID second.
   *  - VALUE_CREATED_TIME_DESCENDING: Sort offer by descending created time first, descending ID second.
   *  - VALUE_COMPANY_ASCENDING: Sort offer by ascending company name first, ascending company ID second, aseconding ID last.
   *  - VALUE_COMPANY_DESCENDING: Sort offer by descending company name first, descending company ID second, descending ID last.
   *  - VALUE_LOCATION_ASCENDING: Sort offer by ascending country first, then ascending state, ascending city and ascending ID.
   *  - VALUE_LOCATION_DESCENDING: Sort offer by descending country first, then descending state, descending city and descending ID.
   *  - VALUE_POSITION_ASCENDING: Sort offer by ascending position name first, ascending position ID second, aseconding ID last.
   *  - VALUE_POSITION_DESCENDING: Sort offer by descending position name first, descending position ID second, descending ID last.
   *  - VALUE_POSITION_LEVEL_ASCENDING: Sort offer by ascending position level first, ascending position ID second, aseconding ID last.
   *  - VALUE_POSITION_LEVEL_DESCENDING: Sort offer by descending position level first, descending position ID second, descending ID last.
   *  - VALUE_TOTAL_PACKAGE_ASCENDING: Sort offer by ascending currency name first, ascending amount second and aseconding ID last.
   *  - VALUE_TOTAL_PACKAGE_DESCENDING: Sort offer by descending currency name first, descending amount second and descending ID last.
   */
  sortOrder?: V1OfferListSortOrderValue;
  /** @format uint64 */
  offset?: string;
  /** @format uint64 */
  limit?: string;
}

export interface V1GetOfferListResponse {
  offerList?: V1Offer[];
  /** @format uint64 */
  totalOfferCount?: string;
}

export interface V1GetOfferRequest {
  /** @format uint64 */
  id?: string;
}

export interface V1GetOfferResponse {
  offer?: V1Offer;
}

export interface V1MonetaryValue {
  /**
   * The amount of the monetary value, represented in the Inflated Integer format with multiplier of 10^5.
   * @format uint64
   */
  amount?: string;
  /** The 3-letter ISO currency code of the currency denoting the monetary value. */
  currency?: string;
}

export interface V1Offer {
  /** @format uint64 */
  id?: string;
  company?: V1Company;
  location?: OfferServicev1Location;
  position?: V1Position;
  totalPackage?: V1MonetaryValue;
  imageUrl?: string;
  /**
   *  - VALUE_UNSPECIFIED: Default status value.
   *  - VALUE_UPLOADED: Status representing a newly created offer.
   *  - VALUE_APPROVED: Status representing an approved offer, ready to be displayed on the public API and included in the aggregated result.
   *  - VALUE_DISAPPROVED: Status representing a disapporved offer, not to be displayed on the public API and included in the aggregated result.
   */
  status?: V1OfferStatusValue;
  /** @format uint64 */
  createdTime?: string;
}

export interface V1OfferImage {
  /** @format uint64 */
  id?: string;
  presignPutUrl?: string;
}

/** Filter options when listing offers. Offers must match all of the provided conditions to be returned in the final result. */
export interface V1OfferListFilterOptions {
  /** The list of company IDs where the offers were extended from. Offers must belong to one of the provided company IDs. */
  companyIdList?: string[];
  /** The list of country ISO codes where the offers were extended from. Offers must belong to one of the provided countries. */
  countryList?: string[];
  /** The list of state names where the offers were extended from. Offers must belong to one of the provided states. */
  stateList?: string[];
  /** The list of city names where the offers were extended from. Offers must belong to one of the provided cities. */
  cityList?: string[];
  /** The list of position titles of the requested offers. Offers must match one of the provided title using full-text index search. */
  positionTitleList?: string[];
  /** The list of position level codes of the requested offers. Offers must match one of the provided level codes. */
  positionLevelList?: V1PositionLevel[];
  /** The list of statuses the offer must be in. Any users can filter for offers with APPROVED status, but only whitelisted users can filter for offer of other statuses. */
  statusList?: V1OfferStatusValue[];
}

/**
 *  - VALUE_CREATED_TIME_ASCENDING: Sort offer by ascending created time first, ascending ID second.
 *  - VALUE_CREATED_TIME_DESCENDING: Sort offer by descending created time first, descending ID second.
 *  - VALUE_COMPANY_ASCENDING: Sort offer by ascending company name first, ascending company ID second, aseconding ID last.
 *  - VALUE_COMPANY_DESCENDING: Sort offer by descending company name first, descending company ID second, descending ID last.
 *  - VALUE_LOCATION_ASCENDING: Sort offer by ascending country first, then ascending state, ascending city and ascending ID.
 *  - VALUE_LOCATION_DESCENDING: Sort offer by descending country first, then descending state, descending city and descending ID.
 *  - VALUE_POSITION_ASCENDING: Sort offer by ascending position name first, ascending position ID second, aseconding ID last.
 *  - VALUE_POSITION_DESCENDING: Sort offer by descending position name first, descending position ID second, descending ID last.
 *  - VALUE_POSITION_LEVEL_ASCENDING: Sort offer by ascending position level first, ascending position ID second, aseconding ID last.
 *  - VALUE_POSITION_LEVEL_DESCENDING: Sort offer by descending position level first, descending position ID second, descending ID last.
 *  - VALUE_TOTAL_PACKAGE_ASCENDING: Sort offer by ascending currency name first, ascending amount second and aseconding ID last.
 *  - VALUE_TOTAL_PACKAGE_DESCENDING: Sort offer by descending currency name first, descending amount second and descending ID last.
 * @default "VALUE_UNSPECIFIED"
 */
export enum V1OfferListSortOrderValue {
  VALUE_UNSPECIFIED = 'VALUE_UNSPECIFIED',
  VALUE_CREATED_TIME_ASCENDING = 'VALUE_CREATED_TIME_ASCENDING',
  VALUE_CREATED_TIME_DESCENDING = 'VALUE_CREATED_TIME_DESCENDING',
  VALUE_COMPANY_ASCENDING = 'VALUE_COMPANY_ASCENDING',
  VALUE_COMPANY_DESCENDING = 'VALUE_COMPANY_DESCENDING',
  VALUE_LOCATION_ASCENDING = 'VALUE_LOCATION_ASCENDING',
  VALUE_LOCATION_DESCENDING = 'VALUE_LOCATION_DESCENDING',
  VALUE_POSITION_ASCENDING = 'VALUE_POSITION_ASCENDING',
  VALUE_POSITION_DESCENDING = 'VALUE_POSITION_DESCENDING',
  VALUE_POSITION_LEVEL_ASCENDING = 'VALUE_POSITION_LEVEL_ASCENDING',
  VALUE_POSITION_LEVEL_DESCENDING = 'VALUE_POSITION_LEVEL_DESCENDING',
  VALUE_TOTAL_PACKAGE_ASCENDING = 'VALUE_TOTAL_PACKAGE_ASCENDING',
  VALUE_TOTAL_PACKAGE_DESCENDING = 'VALUE_TOTAL_PACKAGE_DESCENDING',
}

/**
 *  - VALUE_UNSPECIFIED: Default status value.
 *  - VALUE_UPLOADED: Status representing a newly created offer.
 *  - VALUE_APPROVED: Status representing an approved offer, ready to be displayed on the public API and included in the aggregated result.
 *  - VALUE_DISAPPROVED: Status representing a disapporved offer, not to be displayed on the public API and included in the aggregated result.
 * @default "VALUE_UNSPECIFIED"
 */
export enum V1OfferStatusValue {
  VALUE_UNSPECIFIED = 'VALUE_UNSPECIFIED',
  VALUE_UPLOADED = 'VALUE_UPLOADED',
  VALUE_APPROVED = 'VALUE_APPROVED',
  VALUE_DISAPPROVED = 'VALUE_DISAPPROVED',
}

export interface V1Position {
  /** @format uint64 */
  id?: string;
  /** The title of the position - for example, Software Engineer, Senior Software Engineer, etc... */
  title?: string;
  /** Lhe level of the position. */
  level?: V1PositionLevel;
}

export type V1PositionLevel = object;

export interface V1SearchAggregatedCompanyStatsListRequest {
  /** Filter options when listing aggregated company statistics. Entries must match all of the provided conditions to be returned in the final result. */
  filterOptions?: V1AggregatedCompanyStatsFilterOptions;
  /**
   *  - VALUE_ID_ASCENDING: Sort offer by ascending company ID.
   *  - VALUE_ID_DESCENDING: Sort offer by descending company ID.
   *  - VALUE_NAME_ASCENDING: Sort offer by ascending company name first, ascending company ID second.
   *  - VALUE_NAME_DESCENDING: Sort offer by descending company name first, descending company ID second.
   */
  sortOrder?: V1AggregatedCompanyStatsSortOrderValue;
  /** @format uint64 */
  offset?: string;
  /** @format uint64 */
  limit?: string;
}

export interface V1SearchAggregatedCompanyStatsListResponse {
  companyStatList?: V1AggregatedCompanyStats[];
  /** @format uint64 */
  totalCompanyStatCount?: string;
}

export interface V1UpdateCompanyRequest {
  /** @format uint64 */
  id?: string;
  /** If provided, will update the company's name. */
  name?: string;
  /**
   * If provided, will update the company's profile image.
   * @format uint64
   */
  companyProfileImageId?: string;
}

export interface V1UpdateCompanyResponse {
  company?: V1Company;
}

export interface V1UpdateOfferRequest {
  /** @format uint64 */
  id?: string;
  offer?: V1Offer;
}

export interface V1UpdateOfferResponse {
  offer?: V1Offer;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title offer_service/v1/api.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  offerServiceV1OfferCoreService = {
    /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 *
 * @tags OfferCoreService
 * @name OfferCoreServiceCreateCompany
 * @summary Create a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly add
popular company entries for auto suggestion on the front end - regular users can create new company entries for newly
created offer if the associating company does not exist.
 * @request POST:/offer_service.v1.OfferCoreService/CreateCompany
 */
    offerCoreServiceCreateCompany: (body: V1CreateCompanyRequest, params: RequestParams = {}) =>
      this.request<V1CreateCompanyResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/CreateCompany`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 *
 * @tags OfferCoreService
 * @name OfferCoreServiceCreateCompanyProfileImage
 * @summary Create a new company image entry in the database, and returns a S3 presigned URL that can be used by the client to
upload an image, which can be associated with a company in the future. This API endpoint is provided to allow admin
users a mean to quickly create/update popular company entries for auto suggestion on the front end.
 * @request POST:/offer_service.v1.OfferCoreService/CreateCompanyProfileImage
 */
    offerCoreServiceCreateCompanyProfileImage: (
      body: V1CreateCompanyProfileImageRequest,
      params: RequestParams = {}
    ) =>
      this.request<V1CreateCompanyProfileImageResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/CreateCompanyProfileImage`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceCreateOffer
     * @summary Create a new offer entry in the database.
     * @request POST:/offer_service.v1.OfferCoreService/CreateOffer
     */
    offerCoreServiceCreateOffer: (body: V1CreateOfferRequest, params: RequestParams = {}) =>
      this.request<V1CreateOfferResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/CreateOffer`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags OfferCoreService
 * @name OfferCoreServiceCreateOfferImage
 * @summary Create a new offer image entry in the database, and returns a S3 presigned URL that can be used by the client to
upload an image, which can be associated with an offer in the future.
 * @request POST:/offer_service.v1.OfferCoreService/CreateOfferImage
 */
    offerCoreServiceCreateOfferImage: (
      body: V1CreateOfferImageRequest,
      params: RequestParams = {}
    ) =>
      this.request<V1CreateOfferImageResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/CreateOfferImage`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This API endpoint is meant to be used for simple, fast listing. For more in-depth searching and filtering of aggregated company statistics, use the API endpoint GetAggregatedCompanyStatsList.
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceGetAggregatedCompanyStatsList
     * @summary Get the list of aggregated company statisics.
     * @request POST:/offer_service.v1.OfferCoreService/GetAggregatedCompanyStatsList
     */
    offerCoreServiceGetAggregatedCompanyStatsList: (
      body: V1GetAggregatedCompanyStatsListRequest,
      params: RequestParams = {}
    ) =>
      this.request<V1GetAggregatedCompanyStatsListResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/GetAggregatedCompanyStatsList`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceGetCompanyAggregatedOfferStatsLists
     * @summary Get the list of aggregated offer statistic of a company.
     * @request POST:/offer_service.v1.OfferCoreService/GetCompanyAggregatedOfferStatsLists
     */
    offerCoreServiceGetCompanyAggregatedOfferStatsLists: (
      body: V1GetCompanyAggregatedOfferStatsListsRequest,
      params: RequestParams = {}
    ) =>
      this.request<V1GetCompanyAggregatedOfferStatsListsResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/GetCompanyAggregatedOfferStatsLists`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description If the requested offer's status is not `APPROVED`, the requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceGetOffer
     * @summary Get an offer entry from the database.
     * @request POST:/offer_service.v1.OfferCoreService/GetOffer
     */
    offerCoreServiceGetOffer: (body: V1GetOfferRequest, params: RequestParams = {}) =>
      this.request<V1GetOfferResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/GetOffer`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description If the request tries to filter for orders with non-`APPROVED` statuses, the requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceGetOfferList
     * @summary Get the list of offer entrys from the database that match the provided filter options.
     * @request POST:/offer_service.v1.OfferCoreService/GetOfferList
     */
    offerCoreServiceGetOfferList: (body: V1GetOfferListRequest, params: RequestParams = {}) =>
      this.request<V1GetOfferListResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/GetOfferList`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This API endpoint is meant to be used for more in-depth search and filtering of aggregated company statistic. For simpler, faster listing without any filtering logic, use the API endpoint GetAggregatedCompanyStatsList.
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceSearchAggregatedCompanyStatsList
     * @summary Search the list of aggregated company statisics.
     * @request POST:/offer_service.v1.OfferCoreService/SearchAggregatedCompanyStatsList
     */
    offerCoreServiceSearchAggregatedCompanyStatsList: (
      body: V1SearchAggregatedCompanyStatsListRequest,
      params: RequestParams = {}
    ) =>
      this.request<V1SearchAggregatedCompanyStatsListResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/SearchAggregatedCompanyStatsList`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 *
 * @tags OfferCoreService
 * @name OfferCoreServiceUpdateCompany
 * @summary Update a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly edit
popular company entries for auto suggestion on the front end.
 * @request POST:/offer_service.v1.OfferCoreService/UpdateCompany
 */
    offerCoreServiceUpdateCompany: (body: V1UpdateCompanyRequest, params: RequestParams = {}) =>
      this.request<V1UpdateCompanyResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/UpdateCompany`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
     *
     * @tags OfferCoreService
     * @name OfferCoreServiceUpdateOffer
     * @summary Update the status of an offer entry in the database.
     * @request POST:/offer_service.v1.OfferCoreService/UpdateOffer
     */
    offerCoreServiceUpdateOffer: (body: V1UpdateOfferRequest, params: RequestParams = {}) =>
      this.request<V1UpdateOfferResponse, RpcStatus>({
        path: `/offer_service.v1.OfferCoreService/UpdateOffer`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
