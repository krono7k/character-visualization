export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  };
  
  export type Info = {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  
  export type ApiData = {
    info: Info;
    results: Character[];
  };