import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '217270ab6de9bd68c10c17c9194fddfa';
const AUTHORIZATION_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTcyNzBhYjZkZTliZDY4YzEwYzE3YzkxOTRmZGRmYSIsIm5iZiI6MTczNzQyNjIwOC45MjgsInN1YiI6IjY3OGYwNTIwMDFhNzFhY2E1NGYwNzUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Td432puXGtEFctiDIIEWb2PgSwwQzIvBiszABr7WXT4';

export const getTrendingMovies = async (page = 1) => {
  const { data } = await axios.get(`trending/movie/day`, {
    params: { api_key: API_KEY, page: page, language: 'en-US' },
    headers: {
      Authorization: AUTHORIZATION_TOKEN,
    },
  });

  return data;
};
export const getMovieId = async id => {
  const { data } = await axios.get(`movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return data;
};
export const getMoviesQuery = async query => {
  const { data } = await axios.get(`search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      query,
    },
  });
  return data;
};
export const getReviewsId = async id => {
  const { data } = await axios.get(`/movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return data;
};
export const getCastId = async id => {
  const { data } = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return data;
};
