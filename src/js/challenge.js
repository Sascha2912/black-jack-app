'use strict';

// Create an object that represents an airbnb castle listing.
// It should contain at least one boolean, one string, one number, and one array
// Log out at least two of the keys using the dot notation
const castle = {
    name: "Kings Castle",
    price: 190,
    rentable: true,
    rooms: 16,
    castleResidents: ["Johannis Paul the I", "Johannis Paul the II", "Johannis Paul the III", "Johannis Paul the IV"]
};


console.log("Castle name: " + castle.name);
console.log("Rentable: " + castle.rentable);
console.log("Price: " + castle.price + "$");
console.log("Castle residents: " + castle.castleResidents);