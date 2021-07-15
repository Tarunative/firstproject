import { Dimensions } from "react-native";

const { width, height, fontScale } = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const SCREEN_WIDTH = width;
export const SCREEN_HIGHT = height;

const FontSize = (size) => {
  return size / fontScale;
};
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, FontSize, verticalScale, moderateScale };