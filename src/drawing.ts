import { mouse, left, right, up, down, Point, straightTo, Button } from '@nut-tree/nut-js';
import { Commands } from './constants';

export const drawRect = async ([width, height = width, ...args]: number[]) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
  await mouse.releaseButton(Button.LEFT);
  return width === height ? Commands.DRAW_SQUARE : Commands.DRAW_RECT;
};

export const drawCircle = async ([radius, ...args]: number[]) => {
  let { x, y } = await mouse.getPosition();
  const startCoord = new Point(x + radius, y);
  await mouse.setPosition(startCoord);
  await mouse.pressButton(Button.LEFT);
  for (let degree = 0; degree <= 360; degree += 1) {
    const angle = (degree * Math.PI) / 180;
    const xOffset = Math.cos(angle) * radius;
    const yOffset = Math.sin(angle) * radius;
    const nextPoint = new Point(x + xOffset, y + yOffset);
    await mouse.move(straightTo(nextPoint));
  }
  await mouse.releaseButton(Button.LEFT);
  return Commands.DRAW_CIRCLE;
};
