import { parseBand } from '../src/transform';
import Band from '../src/band';
const band = require('./data/band.json');
const expected = require('./data/expected.json');

test('transform', () => {
  const bandObject: Band = parseBand(band);

  expect(bandObject).toEqual(expected);

  // console.log(JSON.stringify(bandObject, null, 2));
})