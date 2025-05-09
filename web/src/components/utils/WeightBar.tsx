import React, { useMemo } from 'react';

// Color channel mixer function - keeps original functionality
const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

// Color mixer function - keeps original functionality
const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return `rgb(${r}, ${g}, ${b})`;
};

// Updated Fortnite color palette
const COLORS = {
  // Fortnite-inspired colors
  primaryColor: [255, 71, 71],    // Red (for low durability/high weight)
  secondColor: [59, 202, 93],     // Green (for high durability/low weight)
  accentColor: [255, 160, 41],    // Fortnite orange/gold
  rareColor: [42, 173, 237],      // Rare blue
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  // Clamp the percent value between 0 and 100
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  // Calculate the color using the original color mixing logic but with Fortnite colors
  const color = useMemo(
    () =>
      durability
        ? clampedPercent < 50
          ? colorMixer(COLORS.accentColor, COLORS.primaryColor, clampedPercent / 100)
          : colorMixer(COLORS.secondColor, COLORS.accentColor, clampedPercent / 100)
        : clampedPercent > 50
        ? colorMixer(COLORS.primaryColor, COLORS.accentColor, clampedPercent / 100)
        : colorMixer(COLORS.accentColor, COLORS.secondColor, clampedPercent / 50),
    [durability, clampedPercent]
  );

  // Create a gradient for more Fortnite-like appearance
  const gradient = useMemo(() => {
    if (durability) {
      if (clampedPercent > 75) {
        return `linear-gradient(90deg, ${color}, ${COLORS.secondColor[0]}, ${COLORS.secondColor[1]}, ${COLORS.secondColor[2]}, 0.7)`;
      } else if (clampedPercent > 40) {
        return `linear-gradient(90deg, ${color}, rgba(${COLORS.accentColor[0]}, ${COLORS.accentColor[1]}, ${COLORS.accentColor[2]}, 0.7))`;
      } else {
        return `linear-gradient(90deg, ${color}, rgba(${COLORS.primaryColor[0]}, ${COLORS.primaryColor[1]}, ${COLORS.primaryColor[2]}, 0.8))`;
      }
    } else {
      // For weight bars
      if (clampedPercent > 90) {
        return `linear-gradient(90deg, ${color}, rgba(${COLORS.primaryColor[0]}, ${COLORS.primaryColor[1]}, ${COLORS.primaryColor[2]}, 0.7))`;
      } else if (clampedPercent > 70) {
        return `linear-gradient(90deg, ${color}, rgba(${COLORS.accentColor[0]}, ${COLORS.accentColor[1]}, ${COLORS.accentColor[2]}, 0.7))`;
      } else {
        return `linear-gradient(90deg, ${color}, rgba(${COLORS.rareColor[0]}, ${COLORS.rareColor[1]}, ${COLORS.rareColor[2]}, 0.7))`;
      }
    }
  }, [color, clampedPercent, durability]);

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'}>
      <div
        style={{
          visibility: clampedPercent > 0 ? 'visible' : 'hidden',
          height: '100%',
          width: `${clampedPercent}%`,
          background: gradient,
          transition: 'width 0.3s ease-out, background 0.3s ease',
          borderRadius: '2px',
          boxShadow: clampedPercent > 0 ? '0 0 4px rgba(255, 255, 255, 0.2)' : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Add a subtle shine effect for Fortnite style */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '1px 1px 0 0',
          }}
        />
      </div>
    </div>
  );
};

export default WeightBar;
