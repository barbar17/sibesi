import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const saveToken = (token: string) => {
  var tokenEncrypted = CryptoJS.AES.encrypt(token, process.env.NEXT_PUBLIC_KEY_AES || "").toString();
  if (token) {
    Cookies.set(process.env.NEXT_PUBLIC_KEY_TOKEN || "", tokenEncrypted);
  }
};

export const deleteAllToken = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_KEY_TOKEN || "");
};

export const getToken = (typeToken: string) => {
  const token = Cookies.get(typeToken);
  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, process.env.NEXT_PUBLIC_KEY_AES || "");
    const tokenjwt = bytes.toString(CryptoJS.enc.Utf8);
    return tokenjwt;
  } else {
    return "";
  }
};
