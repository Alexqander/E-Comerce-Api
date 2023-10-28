import expressLoader from './express.js';
import databaseLoader from './database.js';

export default async ({ expressApp }) => {
  try {
    await expressLoader({ app: expressApp });
  } catch (error) {
    console.log(' ❌❌ error al cargar express', error);
  }
  try {
    await databaseLoader();
  } catch (error) {
    console.log(' ❌❌ error al cargar la base de datos', error);
  }
};
