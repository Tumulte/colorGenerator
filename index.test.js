import { generateColorSet } from "./index";
const data = new generateColorSet('#67BAA8').generate( [{hueVariation: -39}, {hueVariation: 30}]);

describe('Generate colors', () => {
  it('creates texts of the proper color', () => {
    expect(data.combinationCollection[0].subTextCombination[0].hex).toBe("#C0E3C4")
  })
})
