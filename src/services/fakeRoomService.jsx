import Img from "../img/entrance.png";
import Img1 from "../img/livingRoom.png";
import Img2 from "../img/kitchen1.png";
import Img3 from "../img/masterBathroom.png";
import Img4 from "../img/guestBathroom.png";
import Img5 from "../img/guestBathroom2.png";
import Img6 from "../img/masterBedroom.png";
import Img7 from "../img/bedroom2.png";
import Img8 from "../img/bedroom3.png";
import Img9 from "../img/hallway.png";
import Img10 from "../img/balcony.png";
import Img11 from "../img/patio.png";
import Img12 from "../img/laundry.png";
import Img13 from "../img/paint.png";
import Img14 from "../img/carpet.png";
import Img15 from "../img/construction.png";
import Img16 from "../img/other.png";
import Img18 from "../img/clean.png";
import Img19 from "../img/kitchen.png";

const rooms = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    image: Img,
    name: "Entrance"

    //     genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    // dailyRentalRate: 2.5,
    // publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd4718156",
    image: Img1,
    name: "Living Room",
    itemId: [1, 2, 5]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181561",
    image: Img2,
    name: "Dining Room",
    itemId: [1, 2, 5]
  },
  {
    id: "5b21ca3eeb7f6fbccd4718157",
    image: Img19,
    name: "Kitchen",
    itemId: [2, 3, 5]
  },
  {
    id: "5b21ca3eeb7f6fbccd4718158",
    image: Img3,
    name: "Master Bathroom",
    itemId: [1, 3, 5]
  },
  // /
  {
    id: "5b21ca3eeb7f6fbccd47181590",
    image: Img5,
    name: "1/2 Bathroom",

    itemId: [1, 4]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181591",
    image: Img6,
    name: "Master Bedroom",
    itemId: [1, 2, 4]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181592",
    name: "Guest Bedroom",
    image: Img7,
    itemId: [1, 2, 4, 5]
  },
  // {
  //   id: "5b21ca3eeb7f6fbccd47181593",
  //   image: Img8,
  //   name: "Bedroom 3",
  //   itemId: [1, 2, 4, 5, 6]
  // },
  {
    id: "5b21ca3eeb7f6fbccd47181594",
    image: Img9,
    name: "Hallway",
    itemId: [1, 2, 6]
  },
  {
    id: "5b21ca3eeb7f6fbccd471815941",
    image: Img4,
    name: "Hallway Bathroom",
    itemId: [1, 2, 6]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181595",
    image: Img10,
    name: "Balcony",
    itemId: [1, 2, 5, 6]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181596",
    image: Img11,
    name: "Patio",
    itemId: [1, 2, 4, 6]
  },
  {
    id: "5b21ca3eeb7f6fbccd47181597",
    image: Img12,
    name: "Laundry",
    itemId: [1, 2, 4]
  },
  // {
  //   id: "5b21ca3eeb7f6fbccd47181598",
  //   image: Img18,
  //   name: "Clean",
  //   itemId: [1, 2, 4, 5]
  // },
  // {
  //   id: "5b21ca3eeb7f6fbccd47181598x",
  //   image: Img13,
  //   name: "Paint",
  //   itemId: [1, 2, 4, 5]
  // },
  // {
  //   id: "5b21ca3eeb7f6fbccd47181599",
  //   image: Img14,
  //   name: "Flooring",
  //   itemId: [4, 5, 6]
  // },
  // {
  //   id: "5b21ca3eeb7f6fbccd471815990",
  //   image: Img15,
  //   name: "Construction",
  //   itemId: [1, 4, 5, 6]
  // },
  {
    id: "5b21ca3eeb7f6fbccd471815991",
    image: Img16,
    name: "Other",
    itemId: [1, 2, 4, 6]
  }
];

export function getRooms() {
  return rooms;
}
