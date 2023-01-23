import Jimp from 'jimp';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import { Commands, SIZE_SC } from './constants';

export const getScreenshot = async () => {
  const { x, y } = await mouse.getPosition();
  const screenRegion = new Region(x - SIZE_SC / 2, y - SIZE_SC / 2, SIZE_SC, SIZE_SC);
  const imageRaw = await screen.grabRegion(screenRegion);
  const imageRGB = await imageRaw.toRGB();
  const image = new Jimp(imageRaw.width, imageRaw.height);
  image.bitmap.data = imageRGB.data;
  const imageBase64 = await image.getBase64Async(Jimp.MIME_PNG);
  console.log('imageBase64 :>> ', imageBase64);
  const result = imageBase64.slice(imageBase64.indexOf(',') + 1);
  return `${Commands.PRINT_SC} ${result}`;
};
