const Sneaker = require('../models/Sneaker');

const getAllSneakers = async (req, res) => {
   try {
     const sneakers = await Sneaker.find();
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getSneakerById = async (req, res) => {
   try {
     const sneaker = await Sneaker.findById(req.params.sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }
     return res.status(200).json(sneaker);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const filterSneakers = async (req, res) => {
   const { brand, resellIndex, dateRelease } = req.query;
   
   try {
     const filter = {};
     // Add filters if provided
     if (brand) { filter.brand = brand; }
     if (resellIndex) { filter.resellIndex = resellIndex; }
     if (dateRelease) { filter.dateRelease = dateRelease; }
     const sneakers = await Sneaker.find(filter);
     console.log('Sneakers:', sneakers); 
     if (sneakers.length === 0) { return res.status(200).json([]); }
     return res.status(200).json(sneakers);
   } catch (error) {
     console.error('Error:', error); // Add this line to log any errors
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const toggleCopping = async (req, res) => {
   const { sneakerId } = req.params;

   try { 
     const sneaker = await Sneaker.findById(sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }

     // Toggle the "copping" property
     sneaker.copping = !sneaker.copping;
     const updatedSneaker = await sneaker.save();
     return res.status(200).json(updatedSneaker);   
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};
  
module.exports = { getAllSneakers, getSneakerById, filterSneakers, toggleCopping };
