export interface INonAccount {
  id?: number;
  fName: string;
  lName: string;
  degree: string;
  department: string;
  college: string;
}


export interface NonAccountStateInterface {
  nonAccount: INonAccount;
  allNonAccount: INonAccount[];

}

function state(): NonAccountStateInterface {
  return {
    nonAccount: {
      fName: "",
      lName: "",
      degree: "",
      department: "",
      college: "",
    },
    allNonAccount: [],
  };
}

export default state;
