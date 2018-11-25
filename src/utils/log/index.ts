import logImage from './logImage';

function log(str: string, options: any) {
  if (typeof str === 'string') {
    logImage(str, options);
  }
}

export default log;
