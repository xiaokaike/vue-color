declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface MaterialColors {
  [key: string]: {
    [key: string]: string
  };
}
declare const colors: MaterialColors;
declare module 'material-colors' {
  export default colors;
}