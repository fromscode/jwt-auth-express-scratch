const publicKeyB64URL = process.env.PUBLIC_KEY as string;
const publicKey = Buffer.from(publicKeyB64URL, "base64url").toString("utf-8");

import { createVerify, sign } from "node:crypto";

export default function (token: string) {
  const arr = token.split(".");
  const headerB64URL = arr[0] as string;
  const payloadB64URL = arr[1] as string;
  const signature = arr[2] as string;

  const verify = createVerify("SHA256");
  verify.update(`${headerB64URL}.${payloadB64URL}`);
  if (!verify.verify(publicKey, signature, "base64url")) return false;

  const payload = JSON.parse(
    Buffer.from(payloadB64URL, "base64url").toString("utf-8"),
  );
  if (Date.now() < payload.exp) return false;

  return payload;
}
