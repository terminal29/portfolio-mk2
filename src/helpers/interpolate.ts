export default function interpolate(
  input: number,
  range: { inputRange: Array<number>; outputRange: Array<number> }
) {
  if (range.inputRange.length !== range.outputRange.length)
    throw Error(
      `Input and output ranges are not same length: input: ${range.inputRange.length}, output ${range.outputRange.length}`
    );
  for (let i = 0; i < range.inputRange.length - 1; i++) {
    if (input >= range.inputRange[i] && input <= range.inputRange[i + 1]) {
      const inMin = range.inputRange[i];
      const inMax = range.inputRange[i + 1];
      const outMin = range.outputRange[i];
      const outMax = range.outputRange[i + 1];
      const abs = inMax - inMin;
      if (abs === 0) return 0;
      const percent = (input - inMin) / abs;
      return outMin * (1 - percent) + outMax * percent;
    }
  }
  // Clamp values outside
  if (input < range.inputRange[0]) {
    return range.outputRange[0];
  } else {
    return range.outputRange[range.outputRange.length - 1];
  }
}
