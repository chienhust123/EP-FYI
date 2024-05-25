import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  createCompanyProfileImage,
  createCompany,
  updateCompany,
  createOfferImage,
  createOffer,
  updateOffer,
  getOffer,
  getOfferList,
  getAggregatedCompanyStatsList,
  searchAggregatedCompanyStatsList,
  getCompanayAggregatedOfferStatsList,
} from '../http';
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
  GetOfferListResponse,
  GetOfferListRequest,
  GetAggregatedCompanyStatsListRequest,
  GetAggregatedCompanyStatsListResponse,
  GetCompanyAggregatedOfferStatsListsRequest,
  GetCompanyAggregatedOfferStatsListsResponse,
  SearchAggregatedCompanyStatsListRequest,
  SearchAggregatedCompanyStatsListResponse,
} from '../types';

export const useCreateCompanyProfileImage = (
  options?: UseMutationOptions<
    CreateCompanyProfileImageResponse,
    unknown,
    CreateCompanyProfileImageRequest
  >
) => {
  return useMutation<CreateCompanyProfileImageResponse, unknown, CreateCompanyProfileImageRequest>({
    mutationFn: createCompanyProfileImage,
    ...options,
  });
};

export const useCreateCompany = (
  options?: UseMutationOptions<CreateCompanyResponse, unknown, CreateCompanyRequest>
) => {
  return useMutation<CreateCompanyResponse, unknown, CreateCompanyRequest>({
    mutationFn: createCompany,
    ...options,
  });
};

export const useUpdateCompany = (
  options?: UseMutationOptions<UpdateCompanyResponse, unknown, UpdateCompanyRequest>
) => {
  return useMutation<UpdateCompanyResponse, unknown, UpdateCompanyRequest>({
    mutationFn: updateCompany,
    ...options,
  });
};

export const useCreateOfferImage = (
  options?: UseMutationOptions<CreateOfferImageResponse, unknown, CreateOfferImageRequest>
) => {
  return useMutation<CreateOfferImageResponse, unknown, CreateOfferImageRequest>({
    mutationFn: createOfferImage,
    ...options,
  });
};

export const useCreateOffer = (
  options?: UseMutationOptions<CreateOfferResponse, unknown, CreateOfferRequest>
) => {
  return useMutation<CreateOfferResponse, unknown, CreateOfferRequest>({
    mutationFn: createOffer,
    ...options,
  });
};

export const useUpdateOffer = (
  options?: UseMutationOptions<UpdateOfferResponse, unknown, UpdateOfferRequest>
) => {
  return useMutation<UpdateOfferResponse, unknown, UpdateOfferRequest>({
    mutationFn: updateOffer,
    ...options,
  });
};

export const useGetOffer = (data: GetOfferRequest, options?: UseQueryOptions<GetOfferResponse>) => {
  return useQuery<GetOfferResponse>({
    queryKey: ['offer', data.id],
    queryFn: () => getOffer(data),
    ...options,
  });
};

export const useGetOfferList = (
  data: GetOfferListRequest,
  options?: UseQueryOptions<GetOfferListResponse>
) => {
  return useQuery<GetOfferListResponse>({
    queryKey: ['offer', data],
    queryFn: () => getOfferList(data),
    ...options,
  });
};

export const useGetAggregatedCompanyStatsList = (
  data: GetAggregatedCompanyStatsListRequest,
  options?: UseQueryOptions<GetAggregatedCompanyStatsListResponse>
) => {
  return useQuery<GetAggregatedCompanyStatsListResponse>({
    queryKey: ['getAggregatedCompanyStatsList', data],
    queryFn: () => getAggregatedCompanyStatsList(data),
    ...options,
  });
};

export const useSearchAggregatedCompanyStatsList = (
  data: SearchAggregatedCompanyStatsListRequest,
  options?: UseQueryOptions<SearchAggregatedCompanyStatsListResponse>
) => {
  return useQuery<SearchAggregatedCompanyStatsListResponse>({
    queryKey: ['searchAggregatedCompanyStatsList', data],
    queryFn: () => searchAggregatedCompanyStatsList(data),
    ...options,
  });
};

export const useGetCompanyAggregatedOfferStatsList = (
  data: GetCompanyAggregatedOfferStatsListsRequest,
  options?: UseQueryOptions<GetCompanyAggregatedOfferStatsListsResponse>
) => {
  return useQuery<GetCompanyAggregatedOfferStatsListsResponse>({
    queryKey: ['getCompanyAggregatedOfferStatsList', data],
    queryFn: () => getCompanayAggregatedOfferStatsList(data),
    ...options,
  });
};
