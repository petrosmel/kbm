export interface IGetAllNewsSourcesResponse {
  status: string;
  sources: ISource[];
}

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
