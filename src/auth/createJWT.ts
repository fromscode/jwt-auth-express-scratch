import { createSign } from "node:crypto";

const header = {
  alg: "RS256",
  typ: "JWT",
};

const currTimeInSecs = Math.floor(Date.now() / 1000);

const payload = {
  iat: currTimeInSecs,
  exp: currTimeInSecs + 24 * 60 * 60,
};

const privateKey = process.env.PRIVATE_KEY as string;
const passphrase = process.env.passphrase as string;

export default async function (properties: any) {
  const newPayload = Object.assign(payload, properties);

  const headerb64url = Buffer.from(JSON.stringify(header)).toString(
    "base64url",
  );
  const payloadb64url = Buffer.from(JSON.stringify(newPayload)).toString(
    "base64url",
  );
  const sign = createSign("SHA256");
  sign.update(`${headerb64url}.${payloadb64url}`);
  const signatureB64url = sign.sign(
    {
      key: Buffer.from(privateKey, "base64url").toString("utf-8"),
      passphrase: passphrase,
    },
    "base64url",
  );

  return `${headerb64url}.${payloadb64url}.${signatureB64url}`;
}
