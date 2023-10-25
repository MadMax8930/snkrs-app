const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const baseUrl = 'https://www.whentocop.fr/_next/data/3KOoVWch7GL1sqiG2XMl8/drops'; // Updated URL with JSON data
const mySneakersArray = []; // Array to store sneaker data

function generateUniqueID() { return uuidv4() }

// Function to fetch and add a new sneaker
async function fetchAndAddSneaker(slug, id) {
  try {
    const sneakerUrl = `${baseUrl}/${slug}.json?slug=${slug}&id=${id}`;
    const response = await axios.get(sneakerUrl, {
      headers: {
        'Cache-Control': 'no-cache', // Bypass caching
      },
    });

    if (response.status === 200) {
      const drop = response.data.pageProps.data;

      // Extract the information needed from the individual item
      const img = drop.mainImages[0].url;
      const name = drop.brandName;
      const model = drop.modelName;
      const retailPrice = drop.retailPrice || 'N/A';
      const resellPrice = drop.resellPrice || 'N/A';
      const resellIndex = drop.resellIndex || 'N/A';
      const date = drop.dropDate;

      const uniqueID = generateUniqueID();

      const newSneaker = {
        id: uniqueID,
        img,
        name,
        model,
        retailPrice,
        resellPrice,
        resellIndex,
        date,
        copping: false,
      };

      mySneakersArray.push(newSneaker);
      mySneakersArray.forEach((sneaker, index) => { console.log(`Sneaker #${index + 1}:`, sneaker) });

      fs.writeFileSync('sneakers.json', JSON.stringify(mySneakersArray, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch the first 10 sneakers and save them to the JSON file
async function fetchFirst10Sneakers() {
  try {
    const response = await axios.get(baseUrl + '.json');
    if (response.status === 200) {
      const data = response.data;

      if (data.pageProps && data.pageProps.initialDrops && data.pageProps.initialDrops.nextDrops) {
        const nextDrops = data.pageProps.initialDrops.nextDrops;

        nextDrops.forEach((drop) => {
          const img = drop.mainImages[0].url;
          const name = drop.brandName;
          const model = drop.modelName;
          const retailPrice = drop.retailPrice || 'N/A';
          const resellPrice = drop.resellPrice || 'N/A';
          const resellIndex = drop.resellIndex || 'N/A';
          const date = drop.dropDate;

          const uniqueID = generateUniqueID();

          mySneakersArray.push({
            id: uniqueID,
            img,
            name,
            model,
            retailPrice,
            resellPrice,
            resellIndex,
            date,
            copping: false,
          });
        });

        mySneakersArray.forEach((sneaker, index) => { console.log(`Sneaker #${index + 1}:`, sneaker) });

        fs.writeFileSync('sneakers.json', JSON.stringify(mySneakersArray, null, 2));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch the first 10 sneakers
fetchFirst10Sneakers();

// Read the JSON data file with the mappings of slug and id
const sneakersData = require('./snkrsMapper.json');

// Call the function to add new sneakers based on its slug and id.
sneakersData.sneakers.forEach((sneaker) => {
  fetchAndAddSneaker(sneaker.slug, sneaker.id);
});

