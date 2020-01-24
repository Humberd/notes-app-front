// <reference lib="webworker" /> doesnt work

// @ts-ignore
importScripts('/web-worker-scripts/marked.min.js');

addEventListener('message', ({data}) => {
  // @ts-ignore
  const result = marked(data);
  // @ts-ignore
  postMessage(result);
});
