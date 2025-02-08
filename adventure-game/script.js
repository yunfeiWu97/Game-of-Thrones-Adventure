// TEST
// console.log("JS loaded successfully!");

// start as to record to status
let currentState = "start"; 

// Create an object storyMap to define story logic
const storyMap = {
  start: {
    text: "You wake up in Westeros. Your journey begins here...",
    // answer is an Array
    answers: [
      { text: "Go to winterfell", nextState: "winterfell" },
      { text: "Travel to King's Landing", nextState: "kingslanding" },
      { text: "Sail to the Free Cities", nextState: "essos" }
    ]
  },
  // 🏰 Winterfell section
  winterfell: {
    text: "You arrive at Winterfell. It's cold, but the Starks welcome you. What do you do?",
    answers: [
      { text: "Talk to Jon Snow", nextState: "talk_jon" },
      { text: "Swear loyalty to House Stark", nextState: "loyal_stark" },
      { text: "Conspire with the Boltons", nextState: "betray_stark" }
    ]
  },
  talk_jon: {
    text: "Jon Snow shares tales of White Walkers. You consider your next move.",
    answers: [
      { text: "Join Jon Snow's war", nextState: "battle_throne" },
      { text: "Defend Winterfell", nextState: "white_walkers" }
    ]
  },
  loyal_stark: {
    text: "Jon Snow asks for your help. Do you join him or defend Winterfell?",
    answers: [
      { text: "Join Jon Snow's war", nextState: "battle_throne" },
      { text: "Defend Winterfell", nextState: "white_walkers" }
    ]
  },
  battle_throne: {
    text: "You fight alongside Jon Snow for the Iron Throne. The war is brutal.",
    answers: [
      { text: "Victory! Claim the Iron Throne", nextState: "iron_throne" },
      { text: "Defeat! You are executed as a traitor", nextState: "tragic_death" }
    ]
  },
  white_walkers: {
    text: "The White Walkers attack Winterfell. You must make a final stand.",
    answers: [
      { text: "Win the Battle for the Dawn", nextState: "iron_throne" },
      { text: "Lose and perish in the Long Night", nextState: "white_walker_invasion" }
    ]
  },
  betray_stark: {
    text: "The Boltons welcome you into their fold, but they are ruthless. Do you betray them first?",
    answers: [
      { text: "Betray the Boltons and claim Winterfell", nextState: "rule_winterfell" },
      { text: "Stay loyal to them", nextState: "bolton_betrayal" }
    ]
  },
  rule_winterfell: {
    text: "You successfully take Winterfell and rule as Warden of the North.",
    answers: []
  },
  bolton_betrayal: {
    text: "The Boltons betray you. You are flayed alive.",
    answers: []
  },
  // 🏛 King's Landing section 
  kingslanding: {
    text: "You head south to King's Landing. The royal court awaits. Who will you serve?",
    answers: [
      { text: "Serve Queen Cersei", nextState: "serve_cersei" },
      { text: "Secretly support Daenerys", nextState: "support_dany" }
    ]
  },
  serve_cersei: {
    text: "Cersei offers you the position of Hand of the Queen. What do you do?",
    answers: [
      { text: "Accept the position", nextState: "hand_of_queen" },
      { text: "Betray Cersei and join Tyrion", nextState: "plot_with_tyrion" }
    ]
  },
  hand_of_queen: {
    text: "You gain power, but Cersei is ruthless. Will you survive?",
    answers: []
  },
  plot_with_tyrion: {
    text: "Tyrion offers you a dangerous deal to overthrow the queen. What do you do?",
    answers: [
      { text: "Support the coup", nextState: "iron_throne" },
      { text: "Warn Cersei", nextState: "warn_cersei" }
    ]
  },
  warn_cersei: {
    text: "You inform Cersei about Tyrion's betrayal. She rewards you but trusts you less.",
    answers: []
  },
  support_dany: {
    text: "You secretly work for Daenerys. She finally arrives in Westeros.",
    answers: [
      { text: "Join her war against Cersei", nextState: "battle_throne" },
      { text: "Stay in King's Landing as a spy", nextState: "spy_for_dany" }
    ]
  },
  spy_for_dany: {
    text: "You stay in King's Landing, feeding information to Daenerys. It's dangerous work.",
    answers: []
  },
  // 💴 The Free Cities (Essos) section
  essos: {
    text: "You sail to Essos, seeking your destiny. What's your move?",
    answers: [
      { text: "Join Daenerys' army", nextState: "join_dany" },
      { text: "Become a sellsword", nextState: "sellsword" }
    ]
  },
  join_dany: {
    text: "Daenerys welcomes you. Will you fight for justice or conquest?",
    answers: [
      { text: "Fight for justice", nextState: "justice" },
      { text: "Fight for conquest", nextState: "conquest" }
    ]
  },
  justice: {
    text: "You help free slaves in Meereen. Your legacy lives on.",
    answers: []
  },
  conquest: {
    text: "You sail to Westeros with Daenerys. War is coming.",
    answers: []
  },
  sellsword: {
    text: "You work as a mercenary, but is it a life worth living?",
    answers: []
  },

  // 🎭 Endings
  iron_throne: {
    text: "You successfully claim the Iron Throne and rule the Seven Kingdoms!",
    answers: []
  },
  tragic_death: {
    text: "You are betrayed and executed. Your story ends here.",
    answers: []
  },
  white_walker_invasion: {
    text: "The White Walkers take over Westeros. Humanity is lost.",
    answers: []
  }
};

// Get DOM objects
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const nextBtn = document.querySelector("#next-btn");

// Add Answer Button
function addAnswerButton(answerText, nextState) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.textContent = answerText;
  button.addEventListener("click", () => {
    currentState = nextState; // Update to new state
    renderQuestion();
  });
  li.appendChild(button);
  answersElement.appendChild(li);
}

// Render the question and answer and add a fade-in effect
function renderQuestion() {
  // remove the animation object in order to get fade-in
  questionElement.classList.remove("fade-in");
  answersElement.classList.remove("fade-in");

  // Update content after slight delay
  setTimeout(() => {
    const currentData = storyMap[currentState];
    // Update question text
    questionElement.textContent = currentData.text;
    // Clear the answer from the last render
    answersElement.innerHTML = "";

    // Determine whether to display the Next button based on the current state
    if (!currentData.answers || currentData.answers.length === 0) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
      for (const answer of currentData.answers) {
        addAnswerButton(answer.text, answer.nextState);
      }
    }
    
    questionElement.classList.add("fade-in");
    answersElement.classList.add("fade-in");
  }, 150);
}

document.addEventListener("DOMContentLoaded", () => {
  // hide nextBtn during the wait
  nextBtn.style.display = "none";
  
  // Init keep the current content for 2 seconds
  setTimeout(() => {
    
    questionElement.classList.add("fade-out");
    // Wait for the fade-out x millisecond before updating the content
    setTimeout(() => {
      questionElement.classList.remove("fade-out");
      renderQuestion();
    }, 900);
  }, 1500);

  // Restart
  nextBtn.addEventListener("click", () => {
    currentState = "start";
    renderQuestion();
  });

  // bgmusic
  const musicBtn = document.querySelector("#music-btn");
  const musicIcon = document.querySelector("#music-icon");
  const musicProgress = document.querySelector("#music-progress");
  const bgMusic = document.querySelector("#bg-music");

  // autoplay 
  bgMusic.play().then(() => {
    musicIcon.src = "./pause-svgrepo-com.svg";
  }).catch(error => {
    console.log("Autoplay is not allowed (browser problem)");
  });

  // play/pause
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.src = "./pause-svgrepo-com.svg";
    } else {
      bgMusic.pause();
      musicIcon.src = "./media-player-music-music-symbol-svgrepo-com.svg";
    }
  });

  // Update the music progress bar in real time
  bgMusic.addEventListener("timeupdate", () => {
    const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
    musicProgress.value = progress;
  });

  // Drag the progress bar to adjust the playback progress
  musicProgress.addEventListener("input", (e) => {
    const seekTime = (e.target.value / 100) * bgMusic.duration;
    bgMusic.currentTime = seekTime;
  });
});