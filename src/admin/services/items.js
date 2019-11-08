import http from "../services/http";

//// maybe nex time
// export function getAllRooms() {
//     return http.get("api/v1/rooms")
// }

export function getRoomSubItems(roomName, subCat) {
  ///// moze i prazan arrej a room names su sa onim nulama i ciframa ispred !!!! 
  return http.get(`api/v1/items/?room=${roomName}&subcategory=${subCat}`);
}

export function createItem(item) {
  
  return http.post(`api/v1/items/`, item);
}

/// create item POST {{URL}}/api/v1/items
// {
//   "price": 30,
//   "name": "Repair front door",
//   "subcategory": "Door",
//   "room": "Living roomm"
// }

//// update item PUT {{URL}}/api/v1/items/ +id
// {
//   "room": "living room",
// }

//// delete Item DELETE {{URL}}/api/v1/items/ +id

export const rooms_fixed = [
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Cabinet",
      "Ceilings",
      "Closets",
      "Doors",
      "Drawers",
      "Electric",
      "Heater",
      "Lights",
      "Mirrors",
      "Smoke Alarm",
      "Wall heater",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd6",
    name: "07. Master Bed",
    properName: "Master Bedroom"
  },
  {
    subcategories: [
      "Accessories",
      "Cabinets",
      "Counter tops",
      "Doors",
      "Drawers",
      "Electric",
      "Faucets",
      "Floors",
      "GFCI",
      "Lights",
      "Mirrors",
      "Paper Holder",
      "Shower",
      "Shower tiles",
      "Sinks",
      "Tiles",
      "Toilet",
      "Tubs",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd8",
    name: "08. Master Bath",
    properName: "Master Bathroom"
  },
  {
    subcategories: [
      "Accessories",
      "Cabinets",
      "Counter tops",
      "Doors",
      "Drawers",
      "Electric",
      "Faucets",
      "Floors",
      "GFCI",
      "Jacuzzi",
      "Lights",
      "Mirrors",
      "Paper Holder",
      "Shower",
      "Shower tiles",
      "Sinks",
      "Tiles",
      "Toilet",
      "Tubs",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd7",
    name: "09. 1/2 Bath",
    properName: "Half Bathroom"
  },
  {
    subcategories: ["Cabinets", "Doors", "Lights", "Switch"],
    _id: "5db49bf056c7130534beddda",
    name: "11. Loft",
    properName: "Loft"
  },
  {
    subcategories: ["Cabinets", "Doors", "Electric", "GFCI", "Lights"],
    _id: "5db49bf056c7130534bedddb",
    name: "12. Laundry",
    properName: "Laundry"
  },
  {
    subcategories: ["Cabinets", "Doors", "Electric", "Lights"],
    _id: "5db49bf056c7130534bedddd",
    name: "14. Balcony",
    properName: "Balcony"
  },
  {
    subcategories: [
      "Cabinets",
      "Doors",
      "Electric",
      "Extras",
      "Lights",
      "Plumbing"
    ],
    _id: "5db49bf056c7130534bedddc",
    name: "13. Patio",
    properName: "Patio"
  },
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Cabinets",
      "Ceilings",
      "Closets",
      "Doors",
      "Drawers",
      "Electric",
      "Heater",
      "Lights",
      "Mirrors",
      "Smoke Alarm",
      "Wall heater",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd9",
    name: "10. Extra Bed",
    properName: "Extra Bedroom"
  },
  {
    subcategories: ["Diir", "Trash"],
    _id: "5db49bf056c7130534beddde",
    name: "15. Other",
    properName: "Other"
  },
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Ceilings",
      "Closets",
      "Doors",
      "Electric",
      "Lights",
      "Lock",
      "Mirrors",
      "Smoke Alarm",
      "Switch",
      "Vents",
      "Wall heater",
      "Wire"
    ],
    _id: "5db49bf056c7130534beddcf",
    name: "00. Entrance",
    properName: "Entrance"
  },
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Cabinets",
      "Ceilings",
      "Closets",
      "Doors",
      "Drawers",
      "Electric",
      "Lights",
      "Lock",
      "Mirrors",
      "Smoke Alarm",
      "Switch",
      "Vents",
      "Wall heater",
      "Windows",
      "Wire"
    ],
    _id: "5db49bf056c7130534beddd0",
    name: "01. Living room",
    properName: "Living Room"
  },
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Cabinets",
      "Ceilings",
      "Doors",
      "Drawers",
      "Electric",
      "Floors",
      "Lights",
      "Switch",
      "Wall heater"
    ],
    _id: "5db49bf056c7130534beddd1",
    name: "02. Dining Area",
    properName: "Dining Area"
  },
  {
    subcategories: [
      "Appliance",
      "Blinds",
      "Cabinets",
      "Counter Backsplash",
      "Counter tops",
      "Dishwasher",
      "Doors",
      "Drawers",
      "Electric",
      "Faucets",
      "Floors",
      "Garbage Disposal",
      "GFCI",
      "Lights",
      "Sinks",
      "Stove",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd2",
    name: "03. Kitchen",
    properName: "Kitchen"
  },
  {
    subcategories: [
      "Accessories",
      "Cabinets",
      "Counter tops",
      "Doors",
      "Drawers",
      "Electric",
      "Exhaust",
      "Faucets",
      "Floors",
      "GFCI",
      "Lights",
      "Mirrors",
      "Shower",
      "Shower tiles",
      "Sinks",
      "Tiles",
      "Toilet",
      "Tubs",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd4",
    name: "05. Hallway Bath",
    properName: "Hallway Bathroom"
  },
  {
    subcategories: [
      "Cabinets",
      "Closets",
      "Doors",
      "Drawers",
      "Electric",
      "Windows"
    ],
    _id: "5db49bf056c7130534beddd3",
    name: "04. Hallway",
    properName: "Hallway"
  },
  {
    subcategories: [
      "A/C",
      "Blinds",
      "Cabinets",
      "Ceilings",
      "Closets",
      "Doors",
      "Drawers",
      "Electric",
      "Heater",
      "Lights",
      "Mirrors",
      "Smoke Alarm"
    ],
    _id: "5db49bf056c7130534beddd5",
    name: "06. Guest Bed",
    properName: "Guest Bedroom"
  }
];
