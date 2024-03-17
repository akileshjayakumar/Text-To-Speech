const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

function populateVoiceList() {
  voiceList.innerHTML = "";
  let voices = synth.getVoices();
  voices.forEach((voice) => {
    let isSelected = voice.name === "Google US English" ? "selected" : "";
    let option = new Option(
      `${voice.name} (${voice.lang})`,
      voice.name,
      isSelected,
      isSelected
    );
    voiceList.add(option);
  });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(text) {
  if (synth.speaking) return;
  if (text !== "") {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth
      .getVoices()
      .find((voice) => voice.name === voiceList.value);
    synth.speak(utterance);
  }
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value.length > 0) {
    speak(textarea.value);

    if (textarea.value.length > 80) {
      speechBtn.textContent = isSpeaking ? "Pause Speech" : "Resume Speech";
      isSpeaking = !isSpeaking;
      isSpeaking ? synth.pause() : synth.resume();
    } else {
      speechBtn.textContent = "Convert To Speech";
    }
  }
});

populateVoiceList();
