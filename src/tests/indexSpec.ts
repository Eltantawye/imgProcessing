import supertest from 'supertest';
import app from '../index';
import path from 'path';
import { promises as fsPromises } from 'fs';

import { resizeImage } from '../utils/resizeImage';
import { rootPath } from '../routes';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('if end point has the right params', async (done) => {
    const response = await request.get(
      '/image?filename=fjord&width=350&height=350'
    );

    expect(response.status).toBe(200);
    done();
  });
  it('if endpoint has wrong params', async (done) => {
    const response = await request.get('/image?filename=fjord&width=350');

    expect(response.status).toBe(404);
    done();
  });
});

describe('Test resize functionality', () => {
  // resize image to test caching santamonica.jpg
  beforeAll(async function () {
    const imagePath = path.resolve(`images/test.jpg`);
    await resizeImage(imagePath, 'test', 200, 200);
  });
  //delete test file from thumbnails file
  afterAll(async function () {
    await fsPromises.unlink(`${rootPath}/thumbnails/test_200_200.jpg`);
    await fsPromises.unlink(`${rootPath}/thumbnails/test2_120_120.jpg`);
  });

  it('should resize image and add it to /thumbnails folder', async () => {
    const imagePath = path.resolve(`images/test2.jpg`);
    const resizeResult = await resizeImage(imagePath, 'test2', 120, 120);
    expect(resizeResult).toBe('created');
  });
  it('should return cached', async () => {
    const imagePath = path.resolve(`images/test.jpg`);
    const resizeResult = await resizeImage(imagePath, 'test', 200, 200);
    expect(resizeResult).toBe('cached');
  });
  it('should return error ', async () => {
    const imagePath = path.resolve(`images/santamonicaNotValidImage.jpg`);
    const resizeResult = await resizeImage(
      imagePath,
      'santamonicaNotValidImage',
      0,
      0
    );
    expect(resizeResult).toBe('error');
  });
});
