const dotenv = require('dotenv');
const app = require('./app');
const dbConnect = require('./db/connect');

dotenv.config({ path: './config.env' });

dbConnect();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
