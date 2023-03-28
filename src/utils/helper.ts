import { AllowedCharacters } from "../models/password-generator";

export function generatePassword(
  length: number,
  allowedChars: AllowedCharacters
) {
  const characters: any = {
    upperChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerChars: "abcdefghijklmnopqrstuvwxyz",
    numberChars: "0123456789",
    specialChars: "!()-.?[]_`~;:!@#$%^&*+=",
  };
  let password = "";
  let allowedArray = [];

  const allowedCharsCount: number = Object.values(allowedChars).filter(
    (x) => x === true
  ).length;

  if (allowedChars.uppercase) {
    password += getRandomChar(characters.upperChars);
    allowedArray.push("upperChars");
  }
  if (allowedChars.lowercase) {
    password += getRandomChar(characters.lowerChars);
    allowedArray.push("lowerChars");
  }
  if (allowedChars.numbers) {
    password += getRandomChar(characters.numberChars);
    allowedArray.push("numberChars");
  }
  if (allowedChars.specialchars) {
    password += getRandomChar(characters.specialChars);
    allowedArray.push("specialChars");
  }

  for (let i = 0; i < length - allowedCharsCount; i++) {
    const randomGroup = Math.floor(Math.random() * allowedCharsCount);
    password += getRandomChar(characters[allowedArray[randomGroup]]);
  }

  return shuffleString(password);
}

function getRandomChar(characters: string) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

function shuffleString(str: string) {
  const arr = str.split("");

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join("");
}
