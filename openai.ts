import "dotenv/config";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { play } from "./play";

const speechFile = path.resolve("./speech.mp3");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const startTime = Date.now();
const response = await openai.audio.speech.create({
  model: "tts-1",
  voice: "shimmer",
  input: "Of course, dear. I'm happy to help you."
});
const endTime = Date.now();
console.log(`Took ${endTime - startTime} ms`);

const buffer = Buffer.from(await response.arrayBuffer());
await fs.promises.writeFile(speechFile, buffer);
console.log("Wrote file")

play(speechFile);
