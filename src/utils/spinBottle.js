export const spinBottle = () => {
  const targetAngle = Math.random() < 0.5 ? 0 : 180;
  return 5 * 360 + targetAngle;
};
