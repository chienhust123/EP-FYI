import axios from 'axios';
import { searchAggregatedCompanyStatsList } from '@/services/offer';

export const searchOffersByCompany = (searchValue: string, offset: number, limit: number) =>
  searchAggregatedCompanyStatsList({
    offset,
    limit,
    filter_options: {
      company_name_query: searchValue,
    },
  }).then((resp) => {
    return resp.company_stat_list.map((company) => ({
      value: company.company.id.toString(),
      label: company.company.name,
    }));
  });

export const searchOffersByCountry = (searchValue: string, offset: number, limit: number) =>
  searchAggregatedCompanyStatsList({
    offset,
    limit,
    filter_options: {
      country_list: [searchValue],
    },
  }).then((resp) =>
    resp.company_stat_list.map((company) => ({
      value: company.company.id.toString(),
      label: company.company.name,
    }))
  );
