/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from "apollo-server";
import jwt from "jsonwebtoken";
import config from 'config'
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
// const publicKey = Buffer.from(
//   config.get<string>("publicKey"),
//   "base64"
// ).toString("ascii");
// const privateKey = Buffer.from(
//   config.get<string>("privateKey"),
//   "base64"
// ).toString("ascii");

console.log("publicKey", publicKey);
console.log("privateKey", privateKey);
export function signJwt(object:Record<string, unknown>, options? : jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

export function verifyJwt<T>(token: string): T | null {
    try {
      const decoded = jwt.verify(token, publicKey) as T;
      return decoded;
    } catch (e) {
      return null;
    }
  }
