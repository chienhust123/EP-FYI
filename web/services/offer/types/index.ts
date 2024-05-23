// Enums
export enum OfferStatus {
  VALUE_UNSPECIFIED = 0,
  VALUE_UPLOADED = 1,
  VALUE_APPROVED = 2,
  VALUE_DISAPPROVED = 3,
}

export enum PositionLevel {
  VALUE_UNSPECIFIED = 0,
  VALUE_INTERN = 1,
  VALUE_ENTRY = 2,
  VALUE_MIDDLE = 3,
  VALUE_SENIOR = 4,
  VALUE_PRINCIPAL = 5,
}

export enum OfferListSortOrder {
  VALUE_UNSPECIFIED = 0,
  VALUE_CREATED_TIME_ASCENDING = 1,
  VALUE_CREATED_TIME_DESCENDING = 2,
  VALUE_COMPANY_ASCENDING = 3,
  VALUE_COMPANY_DESCENDING = 4,
  VALUE_LOCATION_ASCENDING = 5,
  VALUE_LOCATION_DESCENDING = 6,
  VALUE_POSITION_ASCENDING = 7,
  VALUE_POSITION_DESCENDING = 8,
  VALUE_POSITION_LEVEL_ASCENDING = 9,
  VALUE_POSITION_LEVEL_DESCENDING = 10,
  VALUE_TOTAL_PACKAGE_ASCENDING = 11,
  VALUE_TOTAL_PACKAGE_DESCENDING = 12,
}

export enum CompanyAggregatedOfferStatsSortOrder {
  VALUE_UNSPECIFIED = 0,
  VALUE_LOCATION_ASCENDING = 5,
  VALUE_LOCATION_DESCENDING = 6,
  VALUE_POSITION_ASCENDING = 7,
  VALUE_POSITION_DESCENDING = 8,
}

export enum AggregatedCompanyStatsSortOrder {
  VALUE_UNSPECIFIED = 0,
  VALUE_ID_ASCENDING = 1,
  VALUE_ID_DESCENDING = 2,
  VALUE_NAME_ASCENDING = 3,
  VALUE_NAME_DESCENDING = 4,
}
// Types
export type CompanyProfileImage = {
  id: number;
  presign_put_url: string;
};

export type Company = {
  id: number;
  name: string;
  profile_image_url: string;
};

export type Location = {
  id: number;
  country: string;
  state?: string;
  city: string;
};

export type Position = {
  id: number;
  title: string;
  level: PositionLevel;
};

export type MonetaryValue = {
  amount: number;
  currency: string;
};

export type OfferImage = {
  id: number;
  presign_put_url: string;
};

export type Offer = {
  id: number;
  company: Company;
  location: Location;
  position: Position;
  total_package: MonetaryValue;
  image_url: string;
  status: OfferStatus;
  created_time: number;
};

export type OfferListFilterOptions = {
  company_id_list?: number[];
  country_list?: string[];
  state_list?: string[];
  city_list?: string[];
  position_title_list?: string[];
  position_level_list?: PositionLevel[];
  status_list?: OfferStatus[];
};

export type AggregatedOfferStats = {
  id: number;
  company: Company;
  location: Location;
  level: PositionLevel;
  minimum_total_package: MonetaryValue;
  maximum_total_package: MonetaryValue;
};

export type AggregatedCompanyStats = {
  company: Company;
  total_submission_count: number;
};

export type AggregatedCompanyStatsFilterOptions = {
  company_name_query?: string;
  country_list?: string[];
  state_list?: string[];
  city_list?: string[];
  position_title_list?: string[];
  position_level_list?: PositionLevel[];
};

// Request and Response Types
export type CreateCompanyRequest = {
  name: string;
  company_profile_image_id: number;
};

export type CreateCompanyProfileImageRequest = {};

export type CreateCompanyProfileImageResponse = {
  image: CompanyProfileImage;
};

export type CreateCompanyResponse = {
  company: Company;
};

export type UpdateCompanyRequest = {
  id: number;
  name?: string;
  company_profile_image_id?: number;
};

export type UpdateCompanyResponse = {
  company: Company;
};

export type CreateOfferImageRequest = {};

export type CreateOfferImageResponse = {
  image: OfferImage;
};

export type CreateOfferRequest = {
  company: Company;
  location: Location;
  position: Position;
  total_package: MonetaryValue;
  image_id: number;
};

export type CreateOfferResponse = {
  offer: Offer;
};

export type UpdateOfferRequest = {
  id: number;
  offer: Offer;
};

export type UpdateOfferResponse = {
  offer: Offer;
};

export type GetOfferRequest = {
  id: number;
};

export type GetOfferResponse = {
  offer: Offer;
};

export type GetOfferListRequest = {
  filter_options?: OfferListFilterOptions;
  sort_order?: OfferListSortOrder;
  offset?: number;
  limit?: number;
};

export type GetOfferListResponse = {
  offer_list: Offer[];
  total_offer_count: number;
};

export type GetAggregatedCompanyStatsListRequest = {
  cursor?: { company_id?: number; company_name?: string };
  sort_order?: AggregatedCompanyStatsSortOrder;
  limit?: number;
};

export type GetAggregatedCompanyStatsListResponse = {
  company_stat_list: AggregatedCompanyStats[];
  previous_cursor?: { previous_company_id?: number; previous_company_name?: string };
  next_cursor?: { next_company_id?: number; next_company_name?: string };
};

export type SearchAggregatedCompanyStatsListRequest = {
  filter_options?: AggregatedCompanyStatsFilterOptions;
  sort_order?: AggregatedCompanyStatsSortOrder;
  offset?: number;
  limit?: number;
};

export type SearchAggregatedCompanyStatsListResponse = {
  company_stat_list: AggregatedCompanyStats[];
  total_company_stat_count: number;
};

export type GetCompanyAggregatedOfferStatsListsRequest = {
  cursor?: { location_id?: number; position_name?: string };
  sort_order?: CompanyAggregatedOfferStatsSortOrder;
  limit?: number;
  base_currency: string;
};

export type GetCompanyAggregatedOfferStatsListsResponse = {
  offer_stat_list: AggregatedCompanyStats[];
  previous_cursor?: { previous_location_id?: number; previous_position_id?: string };
  next_cursor?: { next_location_id?: number; next_position_id?: string };
};
