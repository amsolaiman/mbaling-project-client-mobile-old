export interface HousingInterface {
  id?: string;
  name: string;
}

export interface HousingStateInterface {
  newHousing?: HousingInterface;
  allHousing: HousingInterface[];
}

function state(): HousingStateInterface {
  return {
    allHousing: []
  }
};

export default state;
