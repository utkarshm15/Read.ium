import { secrect } from "../config";

const encoder = new TextEncoder();

export async function hash(password:string){
  const k = encoder.encode(secrect);
  let key = await crypto.subtle.importKey(
    "raw",
    k,
    {name:"HMAC",hash:"SHA-256"},
    true,
    ["sign", "verify"],
  );

  const s = await crypto.subtle.sign("HMAC", key, encoder.encode(password)) 
    let binary = '';
    let bytes = new Uint8Array(s);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
