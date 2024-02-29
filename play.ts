import playSound from "play-sound";

const player = playSound();

export function play(file: string) {
  return player.play(file, (error) => {
    if (error) throw error;
  });
}
