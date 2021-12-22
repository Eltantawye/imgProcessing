import express from 'express';
import { promises as fsPromises } from 'fs';

import path from 'path';
import { resizeImage } from '../utils/resizeImage';

export const rootPath = path.resolve(__dirname + `/../../`);
const routes = express.Router();

routes.get('/', async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  // if there is no errors the resized image will be sent
  try {
    const imagePath = path.resolve(`images/${req.query.filename}.jpg`);
    await fsPromises.readFile(imagePath);
    //resize image function will generate a new image in thumbnails folder if image is not cached
    await resizeImage(imagePath, filename, width as number, height as number);

    res.sendFile(`${rootPath}/thumbnails/${filename}_${width}_${height}.jpg`);
  } catch (error) {
    res.send('Error image not found');
  }
});

export default routes;
