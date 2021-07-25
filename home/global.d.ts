declare module '*.png' {
  var imgData: {
    src: string;
  };
  export default imgData;
}

declare module '*.scss' {
  var styles: {
    [className: string]: string;
  };
  export default styles;
}
