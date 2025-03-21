const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

// Generate RSA Key Pair
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// Encrypt data using Public Key
function encryptData(data, publicKey) {
    const encryptedBuffer = publicEncrypt(publicKey, Buffer.from(data));
    return encryptedBuffer.toString('base64');
}

// Decrypt data using Private Key
function decryptData(encryptedData, privateKey) {
    const decryptedBuffer = privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64'));
    return decryptedBuffer.toString();
}

// Example Usage
const message = "Hello, this is a secret!";
// console.log("Original:", message);

console.log("publicKey   ", publicKey)
console.log("privateKey  ", privateKey)

const encryptedMessage = encryptData(message, publicKey);
// console.log("Encrypted:", encryptedMessage);

const decryptedMessage = decryptData(encryptedMessage, privateKey);
console.log("Decrypted:", decryptedMessage);
