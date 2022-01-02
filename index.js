import { RfColorHelper } from "@rougefw/colorhelper";

const colorUtils = new RfColorHelper();
let curves = {
  linear(x) {
    return x;
  },
  easeIn(x) {
    return 1 - Math.cos((x * 3.1415) / 2);
  },
  easeInHard(x) {
    return x * x;
  },
  easeInHarder(x) {
    return x * x * x;
  },
  easeOut(x) {
    return Math.sin((x * 3.1415) / 2);
  },
  easeOutHard(x) {
    return 1 - (1 - x) * (1 - x);
  },
  easeOutHarder(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  easeInOut(x) {
    return -(Math.cos(3.1415 * x) - 1) / 2;
  },
  easeInOutHard(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  easeInOutHarder(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
};
curves = Object.entries(curves);

const fullIndex = function(array) {
  let fullCombination = [];
  for (let i = 0; i < 10; i++) {
    const offsetIndex = Math.floor((i * array.length) / 10);

    fullCombination[i] = array[offsetIndex];
  }
  return fullCombination;
};
/**
 *
 * @param {string} dominant Hexadecimal of the main color
 * @class
 */
export function generateColorSet(dominant) {
  this.lightVariation = 0;
  this.satVariation = 10;
  /**
   * @type {import("../Typings/global").Hsl}
   */
  this.hsl = colorUtils.hexToHsl(dominant).getValueCollection();
  /**
   * @type {object}
   */
  this.colorCollection = {
    dominant: dominant,
    combinationCollection: []
  };
  const self = this;
  const limiter = function(value, min = 0, max = 100) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  };
  /**
   *
   * @param {number} angle
   * @returns {number}
   */
  const base360 = function(angle) {
    if (angle > 360) {
      return angle - 360;
    } else if (angle < 0) {
      return angle + 360;
    } else {
      return angle;
    }
  };

  /**
   *
   * @param {number} baseValue The original saturation/light value (0-100)
   * @param {number} variation The variation from the base value (1-10)
   * @returns {Array} Returns an evenly distributed array of numbers (min: 0, max: 100. ordered low to high)
   */
  const getSubValues = function(
    baseValue,
    variation,
    count = 10,
    move = 0,
    curveIndex = 0
  ) {
    let outOfRange = 0;
    const halfRound = Math.round(count / 2);

    // calculate the number of values outside of the 0-100 range and returns
    // values below 0 as a negative and above 100 as a positive
    for (let i = 1; i <= 5; i++) {
      if (baseValue + (i - 1) * variation > 100) {
        outOfRange += 1;
      } else if (baseValue - i * variation < 0) {
        outOfRange -= 1;
      }
    }
    // value by which to offset all parameters to stay between 0 and 100
    const offset = outOfRange * variation;
    const newOffset = offset + move;

    let valueCollection = [];
    for (let i = 0; i < count; i++) {
      let value;
      if (i < halfRound) {
        value = baseValue - (count / 2 - i) * variation - newOffset;
      } else {
        value = baseValue + (i - count / 2) * variation - newOffset;
      }
      valueCollection[i] = Math.round(curves[curveIndex][1](value / 100) * 100);
    }
    return valueCollection;
  };
  const getHueValue = function(hue, count = 10) {
    const variationAmt = self.hueVariation;
    const curveIndex = self.hueCurve;
    const halfCount = Math.round(count / 2);
    const hueCollection = [];
    for (let i = 0; i < count; i++) {
      let value;
      const j = curves[curveIndex][1](i / 10) * 10;
      const variation = variationAmt * j;
      if (i < halfCount) {
        value = hue - variationAmt * halfCount + variation;
      } else {
        value = hue + variationAmt * (j - halfCount);
      }
      hueCollection.push(base360(value) + self.hueMove);
    }
    return hueCollection;
  };
  const addCombination = function(combination) {
    combination.hue = base360(combination.hue);
    const hex = colorUtils.hslToHex(combination).getString();
    self.colorCollection.combinationCollection.push({
      hex: hex,
      hue: combination.hue,
      light: combination.light,
      saturation: combination.saturation
    });

    addSubCombination();
  };
  /**
   *
   * @param {Object} combination
   * @param {boolean=} gray

   */
  const createSubCombinationArray = function(combination, gray) {
    const lightCollection = getSubValues(
      combination.light,
      self.lightVariation,
      self.count,
      self.lightMove,
      self.lightCurve
    );
    const satCollection = getSubValues(
      combination.saturation,
      self.satVariation,
      self.count,
      self.satMove,
      self.satCurve
    );
    const hueCollection = getHueValue(combination.hue, self.count);
    let subCombination = [];
    for (let i = 0; i < self.count; i++) {
      subCombination[i] = {
        hue: hueCollection[i] || combination.hue,
        light: lightCollection[i],
        saturation: gray ? 0 : satCollection[i],
        hex: colorUtils
          .hslToHex(
            {
              hue: hueCollection[i] || combination.hue,
              light: limiter(lightCollection[i]),
              saturation: gray ? 0 : limiter(satCollection[i])
            },
            gray
          )
          .getString()
      };
    }
    if (gray) {
      subCombination.push({
        hue: 0,
        light: 0,
        saturation: 0,
        hex: "#000"
      });
      subCombination.push({
        hue: 0,
        light: 100,
        saturation: 0,
        hex: "#fff"
      });
    }
    if (self.full) {
      return fullIndex(subCombination);
    }
    return subCombination;
  };
  /**
   *
   */
  const addSubCombination = function() {
    const combinationCollection = self.colorCollection.combinationCollection;

    const lastEntry = combinationCollection[combinationCollection.length - 1];
    lastEntry.subCombination = createSubCombinationArray(lastEntry);
  };
  /**
   * @param {string} newColor The hex of the new color
   */
  this.updateColor = function(newColor) {
    this.colorCollection.dominant = newColor;
    if (newColor.hue) {
      this.hsl = newColor;
    } else {
      this.hsl = colorUtils.hexToHsl(newColor).getValueCollection();
    }
    return this;
  };

  this.combination = function() {
    const tonic = this.hsl;
    tonic.hue = this.hsl.hue + 180;
    addCombination(tonic);
    return this.colorCollection;
  };
  this.splitCombination = function() {
    const baseHue = this.hsl.hue;
    const tonic = this.hsl;
    const split = 30;
    tonic.hue = this.hsl.hue + (180 + split);
    addCombination(tonic);
    tonic.hue = baseHue;
    tonic.hue = this.hsl.hue + (180 - split);
    addCombination(tonic);

    return this.colorCollection;
  };

  this.generate = function(
    colors,
    {
      count: count,
      hue: { variation: hueVariation, curve: hueCurve, move: hueMove },
      light: { variation: lightVariation, move: lightMove, curve: lightCurve },
      saturation: { variation: satVariation, move: satMove, curve: satCurve },
      full: full
    }
  ) {
    this.count = count;
    this.hueVariation = hueVariation;
    this.hueCurve = hueCurve;
    this.hueMove = hueMove;
    this.satVariation = satVariation;
    this.satMove = satMove;
    this.satCurve = satCurve;
    this.lightVariation = lightVariation;
    this.lightMove = lightMove;
    this.lightCurve = lightCurve;
    this.full = full;
    this.colorCollection.dominantSubCollection = createSubCombinationArray(
      this.hsl
    );
    this.colorCollection.combinationCollection = [];
    colors.forEach(item => {
      const saturation =
        item.saturation !== undefined ? item.saturation : this.hsl.saturation;
      const light = item.light !== undefined ? item.light : this.hsl.light;
      const combination = {
        hue: this.hsl.hue + item.hueVariation,
        saturation: saturation,
        light: light
      };

      addCombination(combination);
    });

    this.colorCollection.graySubCollection = createSubCombinationArray(
      {
        hue: this.hsl.hue,
        saturation: 0,
        light: this.hsl.light
      },
      true
    );
    const vari = (() => {
      const mult = Math.round(this.hsl.hue / 60);
      const peak = 60 * mult;
      return Math.round((this.hsl.hue - peak) / 2);
    })();
    this.colorCollection.alertSubCollection = createSubCombinationArray({
      hue: 0 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.warningSubCollection = createSubCombinationArray({
      hue: 60 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.successSubCollection = createSubCombinationArray({
      hue: 120 + vari * 2,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.infoSubCollection = createSubCombinationArray({
      hue: 240 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });

    return this.colorCollection;
  };
}
