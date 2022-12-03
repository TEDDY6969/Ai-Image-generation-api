const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const app = express()
const port = 8080
const config = new Configuration({  
    apiKey: process.env.dalle,
});
const openai = new OpenAIApi(config);
app.get('/v1/:feed', async (req, res)=> {

const response = await openai.createImage({
    prompt: req.params.feed,
    n: 1,
    size: "1024x1024",
});
  

  const result = response.data.data[0].url;
    /*res.set({'Content-Type': 'image/png'});*/
   res.send(`<img className="result-image" src=${result} alt="result" />`)
})

app.get('/', async (req, res) => {
  res.set({'Content-Type': 'text/html'})
  const data = fs.readFileSync('./index.html')
  res.send(data.toString())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})