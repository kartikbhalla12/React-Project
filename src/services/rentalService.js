import http from './httpService';

export function getRentals() {
  return http.get(`/rentals`);
}
