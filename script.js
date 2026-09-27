// العناصر
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

// أصوات ريترو لطيفة
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

// كتابة النص تدريجياً
async function typeWriter(text, speed = 55) {
  for (let i = 0; i < text.length; i++) {
    typewriterText.textContent += text.charAt(i);
    textContainer.scrollTop = textContainer.scrollHeight;

    if (text.charAt(i) !== ' ' && text.charAt(i) !== '\n') {
      playSound(480, 'sine', 0.03);
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
  await sleep(400);
  typewriterText.textContent = '';
  textContainer.scrollTop = 0;
  textContainer.classList.remove('pixel-fade-out');
  textContainer.classList.add('pixel-fade-in');
  setTimeout(() => textContainer.classList.remove('pixel-fade-in'), 400);
}

// هرب أزرار
function makeButtonDodge(targetBtn) {
  const dodge = (e) => {
    if (e) e.preventDefault();
    playSound(280, 'sawtooth', 0.08);

    const bodyRect = windowBody.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();
    const padding = 15;

    const maxX = bodyRect.width - btnRect.width - padding;
    const maxY = bodyRect.height - btnRect.height - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(110, Math.floor(Math.random() * maxY));

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

// 1. بداية الكرت
startBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  mainWindow.classList.remove('hidden');

  await typeWriter("يا جودي\nتدري وش أغرب شيء بثلاث شهور هذي؟");
  
  resetButtonsPosition();
  makeButtonDodge(noBtn);
  buttonsArea.classList.remove('hidden');
});

// 2. الضغط على زر YES المبدئي
yesBtn.addEventListener('click', async () => {
  playSound(659, 'sine', 0.2);
  buttonsArea.classList.add('hidden');
  resetButtonsPosition();

  await animateTextOut();

  await typeWriter("إني كنت أحسب الأيام هي اللي تمشي وأثرك انتي اللي كنتي تمشين فيني يوم بعد يوم\nشوي من ضحكتك هنا\nشوي من صوتك هناك\nنظرة منك علقت بمكاني\nوكلمة منك للحين كل ما تذكرتها ابتسمت كأني أسمعها أول مره\n\nلين صارت الشهور ما عاد شهور\n\nصارت أنتي");
  await sleep(3000);

  await animateTextOut();
  await typeWriter("وأدري إنك زعلانة مني الحين\nوأعرف إن فيه بخاطرك شي\nبس والله ما أبي أجيك بكلمتين محفوظة وأقول\nخلاص لا تزعلين\nأبيك تزعلين لو بخاطرك زعل\nبس أبي أكون أنا اللي يهوّن عليك هالزعل\nأبي إذا ضاق صدرك تلقين لي مكان\nوإذا عاندك قلبك تلقينني عنده\nوإذا قلتي ما أبي أكلمك\nأكون فاهم إن بعض ما أبي منك تحتاج حضن مو جواب");
  await sleep(3000);

  await animateTextOut();
  await typeWriter("وأنتي يا بنت\nمن قال لك إن قلبي يعرف يخاصمك أصلا؟\nأنا إذا زعلتي أجلس أفتش في ملامحك عن جودي اللي أعرفها وألقى نفسي أحبك أكثر وأنا أدور");
  await sleep(3000);

  await animateTextOut();
  await typeWriter("يا حلوتي\nأنا ما أبي منك الحين تسامحينني عشان الصفحة حلوه\nولا أبيك تنسين اللي ضايقك عشان خاطري");
  await sleep(3000);

  await animateTextOut();
  await typeWriter("أبيك بس تبتسمين\nولو ابتسامتك طلعت صغيره\nترى أنا آخذها كاملة\nوأعتبرها أول صصلح بيننا ♥️");
  await sleep(3500);

  await animateTextOut();
  textContainer.classList.add('hidden');
  nextPhaseBtn.classList.remove('hidden');
});

// 3. زر "طيب... تعالي الحين"
nextPhaseBtn.addEventListener('click', async () => {
  playSound(587, 'sine', 0.2);
  nextPhaseBtn.classList.add('hidden');
  textContainer.classList.remove('hidden');

  await typeWriter("خليني أدلعك شوي\nترى لي من اليوم وأنا محروم من جودي اللي تذوب إذا دلعتها.");
  await sleep(3000);

  await animateTextOut();
  await typeWriter("أحبك يا جودي\nأحبك بطريقة ما تعرف تختصر نفسها بجمله\nأحبك لين صار وجودك عندي شي يشبه الطمأنينه\nما أنتبه له كل لحظه\nلكن إذا غاب أعرف قد إيش كان يسندني\nوإذا كان بخاطرك باقي مني شيء\nتعالي قولي لي أنا أبي أعرف كل اللي بخاطرك،\nحتى الأشياء اللي تقولين عنها ما تسوى\n\nلأن اللي يخص قلبك\nيسوى عندي كثير\n\nوالحين خلاص..");
  await sleep(3500);

  await animateTextOut();
  await typeWriter("كفاية زعل.");
  await sleep(1500);

  await backspaceText();
  await sleep(500);

  await typeWriter("تعالي يا مامي\nأبي أشوف ذيك الابتسامة اللي أحسها تخلّي الدنيا تستحي من شكلها♥️");
  await sleep(3500);

  await animateTextOut();
  
  // البدء بلعبة الأسئلة
  setupQuestionFlow();
});

// 4. نظام الأسئلة مع إضافة السؤال الجديد والزر المزدوج
function setupQuestionFlow() {
  let step = 1;

  const newYesBtn = yesBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

  noBtn.onclick = () => { newYesBtn.click(); };

  async function handleNextStep() {
    playSound(659, 'sine', 0.2);
    buttonsArea.classList.add('hidden');
    resetButtonsPosition();
    noBtn.classList.add('hidden');

    await animateTextOut();

    if (step === 1) {
      step = 2;
      await typeWriter("تحبّيني؟ 🍵");
      newYesBtn.textContent = "إي 💚";
      buttonsArea.classList.remove('hidden');
    } else if (step === 2) {
      step = 3;
      await typeWriter("والله؟ 👀");
      newYesBtn.textContent = "إيه والله";
      buttonsArea.classList.remove('hidden');
    } else if (step === 3) {
      step = 4;
      await typeWriter("والله والله؟");
      newYesBtn.textContent = "إي والله والله";
      buttonsArea.classList.remove('hidden');
    } else if (step === 4) {
      step = 5;
      await typeWriter("يعني والله والله والله والله");
      newYesBtn.textContent = "خلاص كل تبن ♥️";
      buttonsArea.classList.remove('hidden');
    } else if (step === 5) {
      step = 6;
      await typeWriter("ههههههههه طيب اخر اخر سؤال");
      newYesBtn.textContent = "عيوني";
      
      noBtn.textContent = "ايش";
      noBtn.classList.remove('hidden');
      makeButtonDodge(noBtn);
      buttonsArea.classList.remove('hidden');
    } else if (step === 6) {
      step = 7;
      noBtn.classList.add('hidden');
      await typeWriter("يعني أنا للحين الشخص اللي إذا جاك اسمه يبتسم قلبك قبلك؟");
      newYesBtn.textContent = "إي ♥️";
      buttonsArea.classList.remove('hidden');
    } else if (step === 7) {
      // شاشة الخاتمة العاطفية
      noBtn.classList.add('hidden');
      buttonsArea.classList.add('hidden');
      await animateTextOut();

      await typeWriter("جودي\nثلاث شهور مرّت،\nوأنا كل يوم أكتشف إن كلمة أحبك\nصارت أصغر من اللي أحسّه لك\n\nأنا للحين أبيك\nأبي ضحكتك، صوتك، وسوالفك التي لا تنتهي..\n\nثلاث شهور راحت\nوالباقي أبيه معك 🍵🍓");
      await sleep(5000);

      newYesBtn.textContent = "تعالي يا مامي ♥️";
      buttonsArea.innerHTML = '';
      buttonsArea.appendChild(newYesBtn);
      buttonsArea.classList.remove('hidden');

      newYesBtn.onclick = async () => {
        buttonsArea.classList.add('hidden');
        await animateTextOut();
        
        mainWindow.classList.add('pixel-fade-out');
        await sleep(500);
        mainWindow.classList.add('hidden');
        
        finalScreen.classList.remove('hidden');
        spawnParticles();
      };
    }
  }

  newYesBtn.addEventListener('click', handleNextStep);
  handleNextStep(); // تشغيل الخطوة الأولى للأسئلة
}

// تساقط الفراولة والماتشا والقلوب في النهاية
function spawnParticles() {
  const symbols = ['🍵', '🍓', '💚', '💖', '✨'];
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = Math.random() * 2 + 1.8 + 's';
      p.style.fontSize = Math.random() * 18 + 14 + 'px';
      
      particlesContainer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 85);
  }
}
