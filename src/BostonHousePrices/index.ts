import * as tf from '@tensorflow/tfjs';
const parse = require('csv-parse/lib/sync');
import Dataset from '../Dataset';
import {
  DATA,
} from './config';

class BostonHousePrices extends Dataset {
  private data:any;

  constructor() {
    super();

    this.load(async () => {
      await this.loadDataset();
    });
  }

  loadDataset = async () => {
    const dataset = await this.loadFromURL(DATA, 'text');
    console.log(dataset);
    this.data = parse(dataset, {
      skip_empty_lines: true,
      delimiter: '\r',
    });
  }

  get = () => {
    if (!this.loaded) {
      throw new Error('Dataset not loaded yet, call ready()');
    }
    return {
      print: () => {
        console.log('print', this.data[0]);
      },
    };
  }
}

export default BostonHousePrices;
