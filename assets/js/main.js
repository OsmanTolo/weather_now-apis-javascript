/** Get user's location */
let userCurrentLocation = [];
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    userCurrentLocation.push(latitude, longitude);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  },
  (err) => console.log(err)
);
console.log(userCurrentLocation);
