import crypto from "crypto";
import fs from "node:fs/promises";

crypto.generateKeyPair(
  "rsa",
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: process.env.passphrase,
    },
  },
  (err, publicKey, privateKey) => {
    if (err) console.error(err);

    const fileName = import.meta.dirname + "/../../.env";

    const publicKeyB64URL = Buffer.from(publicKey).toString("base64url");
    const privateKeyB64URL = Buffer.from(privateKey).toString("base64url");

    const dataToWrite = `\nPUBLIC_KEY="${publicKeyB64URL}"\nPRIVATE_KEY="${privateKeyB64URL}"`;

    fs.writeFile(fileName, dataToWrite, {
      flag: "a",
    });
  },
);
