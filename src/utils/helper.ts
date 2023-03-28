import React from "react";

export function generatePassword(length: number) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!()-.?[]_`~;:!@#$%^&*+=";
  let password = "";

  password += getRandomChar(upperChars);
  password += getRandomChar(lowerChars);
  password += getRandomChar(numberChars);
  password += getRandomChar(specialChars);

  for (let i = 4; i < length; i++) {
    const randomGroup = Math.floor(Math.random() * 4);
    switch (randomGroup) {
      case 0:
        password += getRandomChar(upperChars);
        break;
      case 1:
        password += getRandomChar(lowerChars);
        break;
      case 2:
        password += getRandomChar(numberChars);
        break;
      case 3:
        password += getRandomChar(specialChars);
        break;
    }
  }

  return shuffleString(password);
}

function getRandomChar(characters: string) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

function shuffleString(str:string) {
  const arr = str.split('');

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
}