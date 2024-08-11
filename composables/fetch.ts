import type { Strapi4Error, Strapi4ResponseMany } from '@nuxtjs/strapi';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

type ApiResponse<T> = {
  data: any;
  error: any;
};

type StrapiSuccess = Strapi4ResponseMany<unknown>;

type StrapiError = Strapi4Error;

export const useApi = () => {
  const strapi_jwt = useStrapiToken();
  const config = useRuntimeConfig();
  const apiURL = config.public.API_BASE_URL;
  /* const accessToken = config.public.STRAPI_JWT; */

  const apiRequest = $fetch.create({
    baseURL: apiURL + '/api',
    headers: {
      Authorization: strapi_jwt.value ? `Bearer ${strapi_jwt.value}` : '',
    },
  });

  const fetchApi = async <T>(
    url: string,
    options?: NitroFetchOptions<NitroFetchRequest>,
  ): Promise<ApiResponse<T>> => {
    try {
      let finalResponse: ApiResponse<T>;

      const response = await apiRequest<Strapi4ResponseMany<unknown>>(
        url,
        options,
      );

      console.log(response);

      if (!response.data) {
        console.log(response.error);
      }

      return {
        data: response.data,
        error: response.error,
      };

      console.log(response.data);
    } catch (error) {
      return {
        data: null,
        error: error,
      };
    }
  };

  return {
    fetchApi,
    apiRequest,
  };
};
