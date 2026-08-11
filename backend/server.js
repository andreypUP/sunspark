import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Sunspark Server, Ready! :) eyyy beplop!.');
});

app.listen(5000, () => {  console.log('Server is running at http://localhost:5000');
});  