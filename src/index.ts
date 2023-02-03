import { MongoClient } from './database/mongo';
import { app } from './server';

export const main = async () => {
  await MongoClient.connect();

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
};

main();
