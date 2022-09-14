export interface UserInterface {
  id?: number;
   username: string;
   password?: string;
   fName: string;
   mName?: string;
   lName: string;
   type: 'student' | 'landlord';
   email: string;
   birthdate: string;
   degree: string;
   department: string;
   college: string;
   contact: string;
   gender:string;
   year: string;
   address1: string;
   address2: string;
   address3: string;
   address4: string;
   housingunit: string;
   prfphoto: string;
   status: 'active' | 'inactive'

}

export interface UserStateInterface {
  allAccount: UserInterface[];
  newUser?: UserInterface;
}

function state(): UserStateInterface {
  return {
    allAccount: [],
  };
//   return {
//     activeUser: {
//       id: 201812730,
//       username: "palawanexpress98",
//       password: "password",
//       isStudent: true,

//       firstname: "Nahed",
//       middlename: "Solaiman",
//       lastname: "Bashier",
//       prfphoto: "https://cdn.quasar.dev/img/boy-avatar.png",

//       degree: "BS Information Technology (Database System)",
//       department: "Department of Information Sciences",
//       college: "College of Information and Computing Sciences",
//       yearAdmitted: 2018,

//       addressLine1: "0059 Disarip Street",
//       addressLine2: "Bubonga Marawi",
//       addressLine3: "Marawi City",
//       addressLine4: "Lanao del Sur",
//       housingAddress: "",

//       birthdate: "1998-10-19",
//       gender: "Male",
//       contact: "09090206852",
//       email: "bashier.ns30@s.msumain.edu.ph",
//     },
//     users: [
//       {
//         id: 201812730,
//         username: "palawanexpress98",
//         password: "password",
//         isStudent: true,

//         firstname: "Nahed",
//         middlename: "Solaiman",
//         lastname: "Bashier",
//         prfphoto: "https://cdn.quasar.dev/img/boy-avatar.png",

//         degree: "BS Information Technology (Database System)",
//         department: "Department of Information Sciences",
//         college: "College of Information and Computing Sciences",
//         yearAdmitted: 2018,

//         addressLine1: "0059 Disarip Street",
//         addressLine2: "Bubonga Marawi",
//         addressLine3: "Marawi City",
//         addressLine4: "Lanao del Sur",
//         housingAddress: "",

//         birthdate: "1998-10-19",
//         gender: "Male",
//         contact: "09090206852",
//         email: "bashier.ns30@s.msumain.edu.ph",
//       },
//       {
//         id: 202200001,
//         username: "zinboarding",
//         password: "password",
//         isStudent: false,

//         firstname: "Azshara",
//         middlename: "Queldorei",
//         lastname: "Highborne",
//         prfphoto: "https://cdn.quasar.dev/img/avatar2.jpg",

//         degree: "",
//         department: "",
//         college: "",
//         yearAdmitted: 0,

//         addressLine1: "1205 5th Street",
//         addressLine2: "Dimaluna I",
//         addressLine3: "Marawi City",
//         addressLine4: "Lanao del Sur",
//         housingAddress: "Zin-Azshari Boarding House",

//         birthdate: "1999-08-31",
//         gender: "Female",
//         contact: "09531409858",
//         email: "azshara.highborne@gmail.com",
//       },
//     ],
//   };
}

export default state;
