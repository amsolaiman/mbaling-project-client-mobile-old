export interface MediaInterface {
  createMedia: { [key: string]: any }[];
  media: { [key: string]: any }[];
}

export interface MediaStateInterface {
  createMedia?: MediaInterface[];
  allMedia: MediaInterface[];
  allPhotos: any[];
}

function state(): MediaStateInterface {
  return {
    allMedia: [],
    allPhotos: [],
    createMedia: [],
  };
}

export default state;
