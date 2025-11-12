const crypto = require('node:crypto');
const { webcrypto } = crypto;

// Some tooling expects crypto.getRandomValues at top-level; Node only exposes it
// under webcrypto, so patch it in before Vite loads.
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
} else if (!globalThis.crypto.getRandomValues && webcrypto?.getRandomValues) {
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}

if (!crypto.getRandomValues && webcrypto?.getRandomValues) {
  crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}
