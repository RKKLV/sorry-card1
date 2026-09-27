// العناصر الرئيسية
const stageOne = document.getElementById('stageOne');
const startBtn = document.getElementById('startBtn');
const mainWindow = document.getElementById('mainWindow');
const windowBody = document.getElementById('windowBody');
const typewriterText = document.getElementById('typewriterText');
const textContainer = document.getElementById('textContainer');
const buttonsArea = document.getElementById('buttonsArea');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const nextPhaseBtn = document.getElementById('nextPhaseBtn');
const finalScreen = document.getElementById('finalScreen');
const particlesContainer = document.getElementById('particlesContainer');

// توليد أصوات الريترو البسيطة
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type, duration) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// دالة كتابة النص مع منع التداخل والتمرير السلس
async function typeWriter(text, speed = 65) {
  for (let i = 0; i < text.length; i++) {
    typewriterText.textContent += text.charAt(i);
    textContainer.scrollTop = textContainer.scrollHeight;

    if (text.charAt(i) !== ' ' && text.charAt(i) !== '\n') {
      playSound(500, 'sine', 0.03);
    }
    await sleep(speed);
  }
}

async function backspaceText(speed = 50) {
  while (typewriterText.textContent.length > 0) {
    typewriterText.textContent = typewriterText.textContent.slice(0, -1);
    playSound(320, 'square', 0.03);
    await sleep(speed);
  }
}

async function animateTextOut() {
  textContainer.classList.add('pixel-fade-out');
  await sleep(450);
  typewriterText.textContent = '';
  textContainer.scrollTop = 0;
  textContainer.classList.remove('pixel-fade-out');
  textContainer.classList.add('pixel-fade-in');
  setTimeout(() => textContainer.classList.remove('pixel-fade-in'), 450);
}

// حركة هرب الأزرار داخل النافذة البيضاء
function makeButtonDodge(targetBtn) {
  const dodge = (e) => {
    if (e) e.preventDefault();
    playSound(300, 'sawtooth', 0.08);

    const bodyRect = windowBody.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();
    const padding = 15;

    const maxX = bodyRect.width - btnRect.width - padding;
    const maxY = bodyRect.height - btnRect.height - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(120, Math.floor(Math.random() * maxY));

    targetBtn.style.position = 'absolute';
    targetBtn.style.left = `${randomX}px`;
    targetBtn.style.top = `${randomY}px`;
  };

  targetBtn.onmouseenter = dodge;
  targetBtn.ontouchstart = dodge;
}

function resetButtonsPosition() {
  yesBtn.style.position = 'static';
  yesBtn.onmouseenter = null;
  yesBtn.ontouchstart = null;

  noBtn.style.position = 'static';
  noBtn.onmouseenter = null;
  noBtn.ontouchstart = null;
}

// 1. فتح الرسالة
startBtn.addEventListener('click', async () => {
  playSound(587, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  mainWindow.classList.remove('hidden');

  await typeWriter("أهلاً بك في النسخة الخاصة ✨\nجاهز تبدأ؟");
  
  // في بداية السؤال: زر 'إي' عادي وزر 'لا' يهرب
  resetButtonsPosition();
  makeButtonDodge(noBtn);
  buttonsArea.classList.remove('hidden');
});

// عند الضغط على زر 'إي' الرئيسي
yesBtn.addEventListener('click', async () => {
  playSound(659, 'sine', 0.2);
  buttonsArea.classList.add('hidden');
  resetButtonsPosition();

  await animateTextOut();

  await typeWriter("هذا النص المخصص لقصتك الجديدة 💜\nيمكنك كتابة كل الكلمات واللحظات الخاصة هنا بسهولة.");
  await sleep(3000);
  await animateTextOut();

  // إخفاء صندوق النص مؤقتاً عند ظهور زر الاستمرار
  textContainer.classList.add('hidden');
  nextPhaseBtn.classList.remove('hidden');
});

// زر المرحلة التالية
nextPhaseBtn.addEventListener('click', async () => {
  playSound(523, 'sine', 0.2);
  nextPhaseBtn.classList.add('hidden');
  textContainer.classList.remove('hidden');

  await typeWriter("وهنا تبدأ لعبة الأسئلة الجديدة...");
  await sleep(2000);
  await animateTextOut();

  startQuestionsFlow();
});

// لعبة الأسئلة والأسلوب التفاعلي
function startQuestionsFlow() {
  let step = 1;

  yesBtn.textContent = "إي 💜";
  noBtn.textContent = "لا";
  resetButtonsPosition();
  makeButtonDodge(noBtn);
  buttonsArea.classList.remove('hidden');

  const newYesBtn = yesBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

  newYesBtn.addEventListener('click', async () => {
    playSound(659, 'sine', 0.2);
    buttonsArea.classList.add('hidden');
    resetButtonsPosition();

    await animateTextOut();

    if (step === 1) {
      step = 2;
      await typeWriter("متأكد؟ 💜");
      newYesBtn.textContent = "أكيد!";
      makeButtonDodge(noBtn);
      buttonsArea.classList.remove('hidden');
    } else if (step === 2) {
      step = 3;
      await typeWriter("يعني ما فيه مفر؟ 🔮");
      newYesBtn.textContent = "مستحيل 💖";
      makeButtonDodge(noBtn);
      buttonsArea.classList.remove('hidden');
    } else if (step === 3) {
      // شاشة النهاية
      buttonsArea.classList.add('hidden');
      await typeWriter("شكراً لك 💜✨");
      await sleep(2000);

      mainWindow.classList.add('pixel-fade-out');
      await sleep(500);
      mainWindow.classList.add('hidden');

      finalScreen.classList.remove('hidden');
      spawnParticles();
    }
  });
}

// تساقط النجوم والقلوب في النهاية
function spawnParticles() {
  const symbols = ['💜', '✨', '🌸', '💖'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = Math.random() * 2 + 1.8 + 's';
      p.style.fontSize = Math.random() * 18 + 14 + 'px';
      
      particlesContainer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 90);
  }
}
