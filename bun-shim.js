
// if (typeof Bun === 'undefined') {
//   console.log('[Bun Shim] Using stub for npm build');
  
//   globalThis.Bun = {
//     // Минимальная заглушка для сборки
//     s3: {
//       file: (id) => ({
//         write: async (data, options) => {
//           console.log('[Bun Shim] Would write to S3:', id?.substring(0, 10) + '...');
//           return { ok: true };
//         },
//         stream: () => ({
//           getReader: () => ({
//             read: async () => ({ done: true, value: undefined }),
//           }),
//         }),
//       }),
//     },
    
//     file: (path) => ({
//       text: async () => '',
//       arrayBuffer: async () => new ArrayBuffer(0),
//       writer: () => ({
//         write: async () => {},
//         end: async () => {},
//       }),
//       stream: () => ({
//         getReader: () => ({
//           read: async () => ({ done: true, value: undefined }),
//         }),
//       }),
//     }),
    
//     write: async () => 0,
//     sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
//   };
  
//   // crypto для сборки
//   if (!globalThis.crypto?.randomUUID) {
//     const { randomUUID } = require('crypto');
//     globalThis.crypto = { ...globalThis.crypto, randomUUID };
//   }
// }

// module.exports = globalThis.Bun;
