import * as tf from '@tensorflow/tfjs';
import oneHot from './utils/oneHot';

import {
  DATAROOT,
} from './config';

interface IProps {
  classes?: number;
}

class Dataset {
  private callbacks: Function[] = [];
  protected loaded: boolean = true;
  protected classes?: number;

  constructor(props: IProps = {}) {
    this.classes = props.classes;
  }

  oneHot = (labelIndex: number|number[]|Uint8Array, classLength?: number) => {
    const classes = classLength || this.classes;
    if (classes <= 1) {
      throw new Error('You must provide more than 1 class to oneHot');
    }

    if (typeof labelIndex === 'number') {
      return oneHot([labelIndex], classes);
    }

    return oneHot(labelIndex, classes);
  }

  ready = (fn = () => {}) => new Promise(resolve => {
    if (this.loaded) {
      fn();
      return resolve();
    }

    this.callbacks.push(() => {
      fn();
      return resolve();
    });
  });

  loadFromURL = async (url: string) => {
    const resp = await fetch(`${DATAROOT}${url}`);
    const buff = await resp.arrayBuffer();
    return new Uint8Array(buff);
  }

  load = async (fn) => {
    this.loaded = false;
    if (fn) {
      await fn();
    }
    this.loaded = true;

    this.callbacks.forEach(fn => fn());
    this.callbacks = [];
  }
}

export default Dataset;
