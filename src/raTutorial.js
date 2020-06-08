let audioContext = new AudioContext();
let resonanceAudioScene = new ResonanceAudio(audioContext);

resonanceAudioScene.output.connect(audioContext.destination);
let roomDimensions = {
  width: 3.1,
  height: 2.5,
  depth: 3.4,
};
let roomMaterials = {
  // Room wall materials
  left: "brick-bare",
  right: "curtain-heavy",
  front: "marble",
  back: "glass-thin",
  // Room floor
  down: "grass",
  // Room ceiling
  up: "transparent",
};
resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

document.getElementById("play").addEventListener("click", (ev) => {
  audioContext.resume().then(() => {
    const playFile = (fileSrc, x, y, z, isLoop) => {
      let audioElement = document.createElement("audio");
      audioElement.src = fileSrc;
      let audioElementSource = audioContext.createMediaElementSource(
        audioElement
      );
      let source = resonanceAudioScene.createSource();
      source.setPosition(x, y, z);
      audioElementSource.connect(source.input);
      audioElement.loop = isLoop;
      audioElement.play();
    };

    // playFile("./recData/rec-bochan.m4a", 0, 0, 0);
    // playFile("./recData/rec-wagahai.m4a", 0, 0, 0);
    playFile("./recData/rec-bochan.m4a", -1, -1, 0, false);
    playFile("./recData/rec-wagahai.m4a", 1, 1, 0, false);

    playFile("./recData/rec-kokoro.m4a", -20, 0, 0, false);
    playFile("./recData/rec-kappa.m4a", 20, 0, 0, false);

    playFile("./soundData/clearing_the_table.mp3", -10, -10, 0, true);
    playFile("./soundData/roasting2.mp3", 20, 20, 0, true);

    console.log("isPlayed");
  });
});
