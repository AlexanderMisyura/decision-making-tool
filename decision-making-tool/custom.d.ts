declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export = styles;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.mp3' {
  const source: string;
  export default source;
}
