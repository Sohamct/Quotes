const express = require("express");
const Quote = require('../Models/quoteModel');

const router = express.Router();

router.get('/quoteOfTheDay', async (req, res) => {
    try {
        const quoteOfTheDay = await Quote.findOne({ date: { $lte: new Date().setHours(0, 0, 0, 0) } }).limit(1);
        console.log("quoteOfTheDay", quoteOfTheDay)
        res.status(200).json({ quoteOfTheDay });
    } catch (error) {
        console.error('Error fetching quote of the day:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getQuoteFromAuthor', async (req, res) => {
    try{
        const {authorName} = req.query;
        // console.log(authorName);

        const quotes = await Quote.find({author: {$regex : authorName, $options: 'i'}});
        if(quotes && quotes.length === 0){
            return res.status(400).json({message: 'No authors found', quotes});
        }
        
        res.status(200).json(quotes);
    }catch(error){
        console.error('Error retrieving quotes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/uploadQuotes', async (req, res) => {
    try {
      const quotesData = req.body;
      const savedQuotes = await Promise.all(quotesData.map(async (quoteData) => {
        const { author, content } = quoteData;
  
        const quote = new Quote({ author: author, quoteText: content, date: new Date() });
  
        await quote.save();
  
        return quote;
      }));
      
      res.status(200).json({ message: 'Quotes uploaded successfully', quotes: savedQuotes });
    } catch (error) {
      console.error('Error uploading quotes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;