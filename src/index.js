import { RfColorHelper } from "@picaro/colorhelper";
import  "core-js/features/array/for-each"
import "core-js/features/object/entries"

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
      value = Math.round(curves[curveIndex][1](value / 100) * 100)
      value = Math.max(value, 0)
      value = Math.min(value, 100)
      valueCollection[i] = value;
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
    const combinationCollection = self.colorCollection.combinationCollection
    combinationCollection.push({
      hex: hex,
      hue: combination.hue,
      light: combination.light,
      saturation: combination.saturation
    });


    addSubCombination();
    const latestCombination = combinationCollection[combinationCollection.length - 1]
    latestCombination.textSubCombination = createTextSubCombination(latestCombination.subCombination)

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
    if (self.full) {
      return fullIndex(subCombination);
    }
    return subCombination;
  };
  const getDiff = function (offset, item, invert, param) {
    let diff = 0
    let mid = 50
    if(param === 'light') {
      mid = 60
    }
    if (param === 'light' && item.hue >= 200 && item.hue <= 300) {
      mid = 75
    }
    if(Math.abs(item[param] - invert[param]) > offset) {
      diff = invert[param]
    }
    else if (item[param] < mid) {
      diff = item[param] + offset > 100 ? 100 : item[param] + offset
    } else {
      diff = item[param] - offset < 0 ? 0 : item[param] - offset
    }
    return diff
  }
  const createTextSubCombination = function(combination) {
    const half = Math.round(combination.length / 2)
    const invert = [...combination].reverse()
    const textSub = []
    combination.forEach((item, index) => {
      const lightDiff = getDiff(self.textLight, item, invert[index], 'light')
      const satDiff = getDiff(self.textSaturation, item, invert[index], 'saturation')

      const colorParams = {hue: invert[index].hue, saturation: satDiff, light: lightDiff}
      const hex = colorUtils.hslToHex(colorParams).getString()
      colorParams.hex = hex
      textSub.push(colorParams)

    })
    return textSub
  }

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
    if (newColor.hue !== undefined) {
      this.hsl = newColor;
    } else {
      this.hsl = colorUtils.hexToHsl(newColor).getValueCollection();
    }
    return this;
  };
  this.generate = function(
    colors = [],
    {
      count: count = 10,
      text: {light: textLight = 50, saturation: textSaturation = 0, hue: textHue = 0} = {},
      hue: { variation: hueVariation = 0, curve: hueCurve = 0, move: hueMove = 0 } = {},
      light: { variation: lightVariation = 5, move: lightMove = 0, curve: lightCurve = 0 } = {},
      saturation: { variation: satVariation = 0, move: satMove = 0, curve: satCurve = 0} = {},
      full: full = true
    } = {}
  ) {
    this.count = parseInt(count, 10);
    this.hueVariation = parseInt(hueVariation, 10);
    this.hueCurve = parseInt(hueCurve, 10);
    this.hueMove = parseInt(hueMove, 10);
    this.satVariation = parseInt(satVariation, 10);
    this.satMove = parseInt(satMove, 10);
    this.satCurve = parseInt(satCurve, 10);
    this.lightVariation = parseInt(lightVariation, 10);
    this.lightMove = parseInt(lightMove, 10);
    this.lightCurve = parseInt(lightCurve, 10);
    this.full = full;
    this.textLight = parseInt(textLight, 10)
    this.textSaturation = parseInt(textSaturation, 10)
    this.textHue = parseInt(textHue, 10)
    this.colorCollection.dominantSubCollection = createSubCombinationArray(
      this.hsl
    );
    this.colorCollection.dominantTextSubCollection = createTextSubCombination(this.colorCollection.dominantSubCollection)
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
    this.colorCollection.grayTextSubCollection = createTextSubCombination(this.colorCollection.graySubCollection)
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
    this.colorCollection.alertTextSubCollection = createTextSubCombination(this.colorCollection.alertSubCollection)

    this.colorCollection.warningSubCollection = createSubCombinationArray({
      hue: 60 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.warningTextSubCollection = createTextSubCombination(this.colorCollection.warningSubCollection)

    this.colorCollection.successSubCollection = createSubCombinationArray({
      hue: 120 + vari * 2,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.successTextSubCollection = createTextSubCombination(this.colorCollection.successSubCollection)

    this.colorCollection.infoSubCollection = createSubCombinationArray({
      hue: 240 + vari,
      saturation: this.hsl.saturation,
      light: this.hsl.light
    });
    this.colorCollection.infoTextSubCollection = createTextSubCombination(this.colorCollection.infoSubCollection)

    return this.colorCollection;
  };
}
