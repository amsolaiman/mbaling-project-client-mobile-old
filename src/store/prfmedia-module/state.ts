
export interface PrfMediaInterface {
  createMedia: { [key: string]: any }[];
  media: { [key: string]: any }[];
}

export interface PrfMediaStateInterface {
  createMedia?: PrfMediaInterface[];
  allMedia: PrfMediaInterface[];
}

function state(): PrfMediaStateInterface {
  return {
    allMedia: [],
    createMedia: [],
  };
}

export default state;
