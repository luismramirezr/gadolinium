declare const VERSION: string;
declare const COMMITHASH: string;
declare const BRANCH: string;
declare const COMMITDATE: string;

declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module 'react-table-plugins';
