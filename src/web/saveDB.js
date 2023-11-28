const Sneaker = require('../models/Sneaker');

async function saveToDatabase() {
  const mySneakersArray = require('../web/data/sneakers.json').slice(0, 10);

  for (const sneakerObj of mySneakersArray) {
    const { uniqueID, id, slug, ...sneakerData } = sneakerObj; // All except uniqueID, id, slug
    const newSneaker = new Sneaker(sneakerData);
    await newSneaker.save();
    console.log('Sneaker saved to database:', newSneaker.toObject());
  }
}

module.exports = saveToDatabase;
