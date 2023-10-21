import expressLoader from './express.js';

export default async ({ expressApp }) => {
  try {
    await expressLoader({ app: expressApp });
  } catch (error) {
    console.log('error al cargar express', error);
  }
};
