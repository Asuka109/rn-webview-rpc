/* eslint-env node, browser */
/* global Comlink, MessageChannelAdapter */


const comlinkVer = '2.3.5';

const loaders = {
  // As found in https://stackoverflow.com/questions/950087/
  loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    // var head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    // script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    document.head.appendChild(script);
  },
  loadScripts(urls, callback) {
    if (urls.length === 1) {
      this.loadScript(urls[0], callback);
    } else {
      this.loadScript(urls[0], () => this.loadScripts(urls.slice(1), callback));
    }
  },
};

function setRnRpc() {
  window.rnRpc = {
    proxy: Comlink.proxy(MessageChannelAdapter.wrap({
      send: data => window.postMessage(data, '*'),
      addEventListener: document.addEventListener,
    })),
    proxyValue: Comlink.proxyValue,
  };
}

loaders.loadScripts(
  [`https://cdn.jsdelivr.net/npm/comlinkjs@${comlinkVer}/comlink.global.js`,
    `https://cdn.jsdelivr.net/npm/comlinkjs@${comlinkVer}/messagechanneladapter.global.js`,
  ],
  setRnRpc,
);


export default loaders;
