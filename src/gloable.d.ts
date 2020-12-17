interface MaterialColors {
  [key: string]: {
    [key: string]: string;
  };
}
declare const colors: MaterialColors;
declare module 'material-colors' {
  export default colors;
}

type clamp = (value: number, min: number, max: number) => number;
declare const clamp: clamp;
declare module 'clamp' {
  export default clamp;
}
