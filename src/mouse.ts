import { mouse, left, right, up, down } from '@nut-tree/nut-js';
import { Commands } from './constants';

export const getMousePos = async () => {
  const pos = await mouse.getPosition();
  return `${Commands.MOUSE_POS} ${pos.x},${pos.y}`;
};

export const moveLeft = async ([px, ...args]: number[]) => {
  await mouse.move(left(px));
  return Commands.LEFT;
};

export const moveRight = async ([px, ...args]: number[]) => {
  await mouse.move(right(px));
  return Commands.RIGHT;
};

export const moveUp = async ([px, ...args]: number[]) => {
  await mouse.move(up(px));
  return Commands.UP;
};

export const moveDown = async ([px, ...args]: number[]) => {
  await mouse.move(down(px));
  return Commands.DOWN;
};
