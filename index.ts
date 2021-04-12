import { parseBand } from './src/transform';
import Band from './src/band';
const bandData = require('./test/data/band.json');
console.log('band = ', JSON.stringify(bandData, null, 2));
const band: Band = parseBand(bandData);
console.log('result = ', JSON.stringify(band, null, 2));