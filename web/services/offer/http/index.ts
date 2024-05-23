// api/offerCoreService.ts
import queryClient from '../../api-client';
import {
  CreateCompanyProfileImageRequest,
  CreateCompanyProfileImageResponse,
  CreateCompanyRequest,
  CreateCompanyResponse,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
  CreateOfferImageRequest,
  CreateOfferImageResponse,
  CreateOfferRequest,
  CreateOfferResponse,
  UpdateOfferRequest,
  UpdateOfferResponse,
  GetOfferRequest,
  GetOfferResponse,
  GetAggregatedCompanyStatsListRequest,
  GetAggregatedCompanyStatsListResponse,
  SearchAggregatedCompanyStatsListRequest,
  SearchAggregatedCompanyStatsListResponse,
  GetCompanyAggregatedOfferStatsListsRequest,
  GetCompanyAggregatedOfferStatsListsResponse,
  GetOfferListRequest,
  GetOfferListResponse,
} from '../types';

export const OFFER_API_PATH = {
  CREATE_COMPANY_PROFILE_IMAGE: '/offer/create_company_profile_image',
  CREATE_COMPANY: '/offer/create_company',
  UPDATE_COMPANY: '/offer/update_company',
  CREATE_OFFER_IMAGE: '/offer/create_offer_image',
  CREATE_OFFER: '/offer/create_offer',
  UPDATE_OFFER: '/offer/update_offer',
  GET_OFFER: '/offer/get_offer',
  GET_OFFER_LIST: '/offer/get_offer_list',
  GET_AGGREGATED_COMPANY_STATS_LIST: '/offer/get_aggregated_company_stats_list',
  SEARCH_AGGREGATED_COMPANY_STATS_LIST: '/offer/search_aggregated_company_stats_list',
  GET_COMPANY_AGGREGATED_OFFER_STATS_LIST: '/offer/get_company_aggregated_offer_stats_lists',
};

export const createCompanyProfileImage = async (
  data: CreateCompanyProfileImageRequest
): Promise<CreateCompanyProfileImageResponse> => {
  const response = await queryClient.post<CreateCompanyProfileImageResponse>(
    OFFER_API_PATH.CREATE_COMPANY_PROFILE_IMAGE,
    data
  );
  return response.data;
};

export const createCompany = async (data: CreateCompanyRequest): Promise<CreateCompanyResponse> => {
  const response = await queryClient.post<CreateCompanyResponse>(
    OFFER_API_PATH.CREATE_COMPANY,
    data
  );
  return response.data;
};

export const updateCompany = async (data: UpdateCompanyRequest): Promise<UpdateCompanyResponse> => {
  const response = await queryClient.post<UpdateCompanyResponse>(
    OFFER_API_PATH.UPDATE_COMPANY,
    data
  );
  return response.data;
};

export const createOfferImage = async (
  data: CreateOfferImageRequest
): Promise<CreateOfferImageResponse> => {
  const response = await queryClient.post<CreateOfferImageResponse>(
    OFFER_API_PATH.CREATE_OFFER_IMAGE,
    data
  );
  return response.data;
};

export const createOffer = async (data: CreateOfferRequest): Promise<CreateOfferResponse> => {
  const response = await queryClient.post<CreateOfferResponse>(OFFER_API_PATH.CREATE_OFFER, data);
  return response.data;
};

export const updateOffer = async (data: UpdateOfferRequest): Promise<UpdateOfferResponse> => {
  const response = await queryClient.post<UpdateOfferResponse>(OFFER_API_PATH.UPDATE_OFFER, data);
  return response.data;
};

export const getOffer = async (data: GetOfferRequest): Promise<GetOfferResponse> => {
  const response = await queryClient.post<GetOfferResponse>(OFFER_API_PATH.GET_OFFER, data);
  return response.data;
};

export const getOfferList = async (data: GetOfferListRequest): Promise<GetOfferListResponse> => {
  const response = await queryClient.post<GetOfferListResponse>(
    OFFER_API_PATH.GET_OFFER_LIST,
    data
  );
  return response.data;
};

export const getAggregatedCompanyStatsList = async (
  data: GetAggregatedCompanyStatsListRequest
): Promise<GetAggregatedCompanyStatsListResponse> => {
  const response = await queryClient.post<GetAggregatedCompanyStatsListResponse>(
    OFFER_API_PATH.GET_AGGREGATED_COMPANY_STATS_LIST,
    data
  );
  return response.data;
};

export const searchAggregatedCompanyStatsList = async (
  data: SearchAggregatedCompanyStatsListRequest
): Promise<SearchAggregatedCompanyStatsListResponse> => {
  const response = await queryClient.post<SearchAggregatedCompanyStatsListResponse>(
    OFFER_API_PATH.SEARCH_AGGREGATED_COMPANY_STATS_LIST,
    data
  );
  return response.data;
};

export const getCompanayAggregatedOfferStatsList = async (
  data: GetCompanyAggregatedOfferStatsListsRequest
): Promise<GetCompanyAggregatedOfferStatsListsResponse> => {
  const response = await queryClient.post<GetCompanyAggregatedOfferStatsListsResponse>(
    OFFER_API_PATH.GET_COMPANY_AGGREGATED_OFFER_STATS_LIST,
    data
  );
  return response.data;
};
