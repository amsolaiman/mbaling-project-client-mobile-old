export interface IApplication {
id?: number;
studentID: number;
landlordID: number;
status: 'pending' | 'accepted'
}


export interface ApplicationStateInterface {
  application: IApplication;
  applications: IApplication[];

}

function state(): ApplicationStateInterface {
  return {
    application: {
      id: 0,
      studentID: 0,
      landlordID: 0,
      status: 'pending',
    },
    applications: [],
  };
}

export default state;
