/* global global */


import ObjectPolyfill from 'core-js/es6/object'; // eslint-disable-line import/no-extraneous-dependencies
import SymbolPolyfill from 'core-js/es6/symbol'; // eslint-disable-line import/no-extraneous-dependencies
import SetPolyfill from 'core-js/es6/set'; // eslint-disable-line import/no-extraneous-dependencies
import WeakSetPolyfill from 'core-js/es6/weak-set'; // eslint-disable-line import/no-extraneous-dependencies
import proxyPolyfill from 'proxy-polyfill/src/proxy';
import { MessageChannelPolyfill, MessagePortPolyfill } from './message-channel-polyfill';


const globalPolyfill = (globalName, localVar) => {
  if (typeof global[globalName] === 'undefined') {
    global[globalName] = localVar;
  }
};

const polyfills = {
  Symbol: SymbolPolyfill,
  Set: SetPolyfill,
  WeakSet: WeakSetPolyfill,
  Proxy: proxyPolyfill(),
  MessagePort: MessagePortPolyfill,
  MessageChannel: MessageChannelPolyfill,
};

try {
  Object.keys(1);
} catch (error) {
  // Replacing with ES6 Object that accepts numbers.
  global.Object = ObjectPolyfill;
}

Object.keys(polyfills).forEach((p) => {
  globalPolyfill(p, polyfills[p]);
});
