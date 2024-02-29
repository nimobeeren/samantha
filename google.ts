import tts from "@google-cloud/text-to-speech";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { play } from "./play";

const client = new tts.TextToSpeechClient();

const speechFile = path.resolve("./speech.mp3");

const startTime = Date.now();
const [response] = await client.synthesizeSpeech({
  input: {
    text: "Of course, dear. I'm happy to help you again.",
  },
  voice: { name: "en-US-Studio-O", languageCode: "en-US" },
  audioConfig: { audioEncoding: "MP3", pitch: 0, speakingRate: 1 },
});
const endTime = Date.now();
console.log(`Took ${endTime - startTime} ms`);

if (!response.audioContent) {
  throw new Error("No audio content");
}
await fs.promises.writeFile(speechFile, response.audioContent, "binary");
console.log("Wrote file");

play(speechFile);
