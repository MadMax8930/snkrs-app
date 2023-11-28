const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function generateUniqueID() { return uuidv4() }
const uniqueID = generateUniqueID();

const dataPath = path.join(__dirname, '../web/data');
const jsonFilePath = path.join(dataPath, 'sneakers.json');
const jsFilePath = path.join(dataPath, 'sneakers.js');

const segment = 'vMVgPctMJxNGeuHOE1cpo'
const baseUrl = `https://www.whentocop.fr/_next/data/${segment}/drops`;
const mySneakersArray = []; // Array to store sneaker data

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
      const brand = drop.brandCategories[0].brandCategoryName;
      const dateRelease = drop.dropDate;
      const sneakerIdentifier = drop.id;
      const sneakerSlug = drop.slug;

      const newSneaker = {
        uniqueID,
        img,
        name,
        model,
        retailPrice,
        resellPrice,
        resellIndex,
        dateRelease,
        brand,
        copping: false,
        id: sneakerIdentifier,
        slug: sneakerSlug,
      };

      mySneakersArray.push(newSneaker);
      mySneakersArray.forEach((sneaker, index) => { console.log(`Sneaker #${index + 1}:`, sneaker) });

      // Write to sneakers.json
      fs.writeFileSync(jsonFilePath, JSON.stringify(mySneakersArray, null, 2));
      // Write to sneakers.js
      fs.writeFileSync(jsFilePath, `export const sneakerDropsScraper = ${JSON.stringify(mySneakersArray, null, 2)}`);
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
          const brand = drop.brandCategories[0].brandCategoryName;
          const dateRelease = drop.dropDate;
          const sneakerIdentifier = drop.id;
          const sneakerSlug = drop.slug;

          mySneakersArray.push({
            uniqueID,
            img,
            name,
            model,
            retailPrice,
            resellPrice,
            resellIndex,
            dateRelease,
            brand,
            copping: false,
            id: sneakerIdentifier,
            slug: sneakerSlug,
          });
        });

        mySneakersArray.forEach((sneaker, index) => { console.log(`Sneaker #${index + 1}:`, sneaker) });

        // Write to sneakers.json
        fs.writeFileSync(jsonFilePath, JSON.stringify(mySneakersArray, null, 2));
        // Write to sneakers.js
        fs.writeFileSync(jsFilePath, `export const sneakerDropsScraper = ${JSON.stringify(mySneakersArray, null, 2)}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch the first 10 sneakers
fetchFirst10Sneakers();

// Read the JSON data file with the mappings of slug and id
const sneakersData = require('./data/snkrsMapper.json');

// Call the function to add new sneakers based on its slug and id.
sneakersData.sneakers.forEach((sneaker) => {
  fetchAndAddSneaker(sneaker.slug, sneaker.id);
});

