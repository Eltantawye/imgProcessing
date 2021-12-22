import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';

import { rootPath } from '../routes';

type resizeReturn = 'created' | 'cached' | 'error';
/**
 *
 * @param imagePath string: path of the image inside image file
 * @param imgName string: name of the image
 * @param width number: width in pixels
 * @param height number: width in pixels
 * @returns : string created | cached | error
 */
export const resizeImage = async (
  imagePath: string,
  imgName: string,
  width: number,
  height: number
): Promise<resizeReturn> => {
  try {
    const resizedImagePath = `${rootPath}/thumbnails/${imgName}_${width}_${height}.jpg`;

    // if path of resized image is founded with same
    if (fs.existsSync(resizedImagePath)) {
      return 'cached';
    }

    const resizedImage = await sharp(imagePath).resize({
      width,
      height,
    });
    if (!fs.existsSync(`${rootPath}/thumbnails`)) {
      await fsPromises.mkdir(`${rootPath}/thumbnails`);
    }

    await resizedImage.toFile(resizedImagePath);
    return 'created';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
