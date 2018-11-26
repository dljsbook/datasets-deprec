import * as tfvis from '@tensorflow/tfjs-vis';
import {
  ITable,
  IOptions,
} from './types';

type IProps = (data: ITable, props?: IOptions) => void;

const logTable: IProps = (data, { name } = {}) => {
  const surface = tfvis.visor().surface({
    name: name || 'Table',
    tab: 'Console',
  });
  const headers = Object.keys(data[0]);
  tfvis.render.table({
    headers,
    values: data.map(row => headers.map(header => row[header])),
  }, surface);
}

export default logTable;


