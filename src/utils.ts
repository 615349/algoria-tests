import { Algoria } from "./types";
export const baseUrl = 'https://hn.algolia.com/api/v1/search_by_date';
export const url = `${baseUrl}?tags=story&hitsPerPage=5`

export const fetchAlgoria = (): Promise<Algoria> => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText)
    }
    return res.json();
  });
}
