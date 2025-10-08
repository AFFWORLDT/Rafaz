// Polyfill for crypto.randomUUID
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {};
}

if (typeof globalThis.crypto.randomUUID === 'undefined') {
  globalThis.crypto.randomUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}
