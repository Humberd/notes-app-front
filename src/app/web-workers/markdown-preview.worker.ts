// <reference lib="webworker" /> doesnt work

// @ts-ignore
importScripts('/web-worker-scripts/marked.min.js');
// @ts-ignore
marked.setOptions({
  gfm: true,
  headerIds: true,
  smartLists: true,
  smartypants: true,
  mangle: true,
});

addEventListener('message', ({data}) => {
  // @ts-ignore
  const result = marked(data);
  // @ts-ignore
  postMessage(result);
});
