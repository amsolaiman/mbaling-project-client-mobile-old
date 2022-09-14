export interface PostInterface {
  id?: number;
  title: string;
  fee: string;
  description: string;
  prvKitchen: boolean;
  prvCR: boolean;
  photos: string;
  visibility: string;
  housingAddress: string;
  url: number
}

export interface PostStateInterface {
  newPost?: PostInterface;
  posts: PostInterface[];
}

function state(): PostStateInterface {
  return {
      posts: []
//     newPost: {
//       id: 135413523,
//       title:
//         "Free boarding room @ Zin-Azshari Boarding House 5th street MSU-Marawi",
//       fee: "1200",
//       description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
//       prvKitchen: false,
//       prvCR: false,
//       photos: [
//         {
//           id: 1,
//           url: "https://cdn.quasar.dev/img/parallax1.jpg",
//         },
//         {
//           id: 2,
//           url: "https://cdn.quasar.dev/img/mountains.jpg",
//         },
//         {
//           id: 3,
//           url: "https://cdn.quasar.dev/img/quasar.jpg",
//         },
//       ],
//       date: 1631096539262,

//       housingAddress: "Zin-Azshari Boarding House",
//       username: "zinboarding",
//       prfphoto: "https://cdn.quasar.dev/img/avatar2.jpg",
//     },
//     posts: [
//       {
//         id: 135413523,
//         title:
//           "Free boarding room @ Zin-Azshari Boarding House 5th street MSU-Marawi",
//         fee: "1200",
//         description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
//         prvKitchen: false,
//         prvCR: false,
//         photos: [
//           {
//             id: 1,
//             url: "https://cdn.quasar.dev/img/parallax1.jpg",
//           },
//           {
//             id: 2,
//             url: "https://cdn.quasar.dev/img/mountains.jpg",
//           },
//           {
//             id: 3,
//             url: "https://cdn.quasar.dev/img/quasar.jpg",
//           },
//         ],
//         date: 1631096539262,

//         housingAddress: "Zin-Azshari Boarding House",
//         username: "zinboarding",
//         prfphoto: "https://cdn.quasar.dev/img/avatar2.jpg",
//       },
//       {
//         id: 134134,
//         title:
//           "Family/Couple size Apartment room w/ Private kitchen and bathroom",
//         fee: "6500",
//         description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
//         prvKitchen: true,
//         prvCR: true,
//         photos: [
//           {
//             id: 1,
//             url: "https://cdn.quasar.dev/img/parallax2.jpg",
//           },
//           {
//             id: 2,
//             url: "https://cdn.quasar.dev/img/mountains.jpg",
//           },
//         ],
//         date: 1632388510672,

//         housingAddress: "Pirate King Apartment",
//         username: "pirateking_home",
//         prfphoto: "https://cdn.quasar.dev/img/avatar4.jpg",
//       },
//     ],
//   };
}
}

export default state;
