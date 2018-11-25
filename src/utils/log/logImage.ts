import * as tfvis from '@tensorflow/tfjs-vis';

type IProps = (src: string, props?: { width: number; height: number; }) => void;

const logImage: IProps = (src, { width, height } = {}) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    if (!width) {
      width = img.width;
    }
    if (!height) {
      height = img.height;
    }
    const style = {
      'font-size': '1px',
      padding: `${height * .5}px ${width * .5}px`,
      'background-image': `url(${src})`,
      height: `${height}px`,
      width: `${width}px`,
      display: 'block',
      color: 'transparent',
    };
    // console.log('%c ', Object.keys(style).map(key => `${key}: ${style[key]}`).join(';'));
    const surface = tfvis.visor().surface({
      name: 'Image',
      tab: 'Console',
    });
    surface.drawArea.appendChild(img);
    // tfvis.render
  }
}

export default logImage;

