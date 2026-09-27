// ==========================================
// العناصر الأساسية
// ==========================================
const stageOne = document.getElementById('stageOne');
const startStoryBtn = document.getElementById('startStoryBtn');
const loveWindow = document.getElementById('loveWindow');
const storyText = document.getElementById('storyText');
const textContainer = document.getElementById('textContainer');
const buttonsArea = document.getElementById('buttonsArea');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const finalScreen = document.getElementById('finalScreen');
const heartsContainer = document.getElementById('heartsContainer');

// ==========================================
// نظام الأصوات
// ==========================================
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

// ==========================================
// دوال الكتابة والمسح
// ==========================================
async function typeWriter(text, speed = 50) {
  for (let i = 0; i < text.length; i++) {
    storyText.textContent += text.charAt(i);
    if (textContainer) {
      textContainer.scrollTop = textContainer.scrollHeight;
    }
    if (text.charAt(i) !== ' ' && text.charAt(i) !== '\n') {
      playSound(480, 'sine', 0.03);
    }
    await sleep(speed);
  }
}

async function backspaceText(speed = 65) {
  while (storyText.textContent.length > 0) {
    storyText.textContent = storyText.textContent.slice(0, -1);
    playSound(320, 'square', 0.03);
    await sleep(speed);
  }
}

async function animateTextOut() {
  if (textContainer) {
    playSound(200, 'square', 0.12);
    textContainer.classList.add('pixel-fade-out');
    await sleep(450);
    storyText.textContent = '';
    textContainer.scrollTop = 0;
    textContainer.classList.remove('pixel-fade-out');
    textContainer.classList.add('pixel-fade-in');
    setTimeout(() => textContainer.classList.remove('pixel-fade-in'), 450);
  } else {
    storyText.textContent = '';
  }
}

async function showSegment(text, pauseTime = 3500) {
  await typeWriter(text);
  await sleep(pauseTime);
  await animateTextOut();
}

// ==========================================
// التفاعل وسلسلة الرسائل
// ==========================================
startStoryBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  loveWindow.classList.remove('hidden');

  buttonsArea.classList.add('hidden');
  if (noBtn) noBtn.classList.add('hidden');

  // المقطع 1
  await showSegment(
    "مامي\nأدري إنك رجعتي اليوم من دوامك وأنتي شايله من التعب يكفي يومين ونمتي قبل حتى ما تعطين نفسك فرصة انها تهدا",
    3500
  );

  // المقطع 2
  await showSegment(
    "وأنا؟\nما قدرت أشوفك نايمة واعدي اليوم\n\nفقلت أسوي لك شيء صغير\nشي إذا فتحتيه بعد ما تصحين تحسين إن فيه أحد كان يفكر فيك وأنتي بعيدة عن الدنيا كلها",
    4000
  );

  // المقطع 3
  await showSegment(
    "وما أبي منك شي\nلا رد ولا كلام ولا حتى تروقين عشاني\n\nأبيك بس تصحين وأنتي عارفة إن فيه قلب ينتبه لك حتى في الأشياء اللي ما تقولينها",
    4000
  );

  // المقطع 4
  await showSegment(
    "وإذا كان يومك اليوم ثقيل\nخليه هنا\n\nتعالي خذي نفس واشربي مويا وعدّلي مخدتك\nوالباقي خلّيه علي",
    4000
  );

  // المقطع 5 (يبقى النص مكتوباً ويظهر الزر أسفله)
  await typeWriter("لان انتي مو مطالبة تكونين بخير طول الوقت يا مامي\nيكفي إنك أنتي ♥️.");
  await sleep(1200);

  // إعداد الزر الوحيد
  yesBtn.textContent = "الحين كملي\nعندي لك شيء ثاني✨";
  yesBtn.style.width = "100%";
  yesBtn.style.fontSize = "14px";
  yesBtn.style.padding = "12px 10px";
  yesBtn.style.lineHeight = "1.5";
  yesBtn.style.whiteSpace = "pre-line";

  buttonsArea.innerHTML = '';
  buttonsArea.appendChild(yesBtn);
  buttonsArea.classList.remove('hidden');

  // عند ضغط الزر للانتقال للجزء الثاني
  yesBtn.onclick = async () => {
    playSound(659, 'sine', 0.2);
    buttonsArea.classList.add('hidden');
    await animateTextOut();

    // الجزء الثاني من المفاجأة
    await showSegment("خليني أدلعك شوي\nترى لي من اليوم وأنا محروم منك ومن دلعك.", 3000);

    await showSegment("أحبك يا مامي\nأحبك بطريقة ما تعرف تختصر نفسها بجمله\nأحبك لين صار وجودك عندي شي يشبه الطمأنينه\nما أنتبه له كل لحظه\nلكن إذا غاب أعرف قد إيش كان يسندني\n\nوإذا كان بخاطرك باقي شيء\nتعالي قولي لي أنا أبي أعرف كل اللي بخاطرك،\nحتى الأشياء اللي تقولين عنها ما تسوى\n\nلأن اللي يخص قلبك\nيسوى عندي كثير", 4500);

    // كلمة حذف ذاتية
    await typeWriter("والحين كفاية تعب.");
    await sleep(1200);
    await backspaceText();
    await sleep(400);

    await typeWriter("تعالي يا مامي\nأبي أشوف ذيك الابتسامة اللي أحسها تخلّي الدنيا كلها تروق ♥️");
    await sleep(3500);

    // الانتقال للشاشة النهائية والقلوب
    loveWindow.classList.add('pixel-fade-out');
    await sleep(500);
    loveWindow.classList.add('hidden');

    if (finalScreen) {
      finalScreen.classList.remove('hidden');
    }
    rainHearts();
  };
});

// ==========================================
// تساقط القلوب والأشكال
// ==========================================
function rainHearts() {
  if (!heartsContainer) return;
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('falling-heart');
      heart.textContent = ['♥️', '💖', '🌸', '✨', '🍵', '🍓'][Math.floor(Math.random() * 6)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 2 + 2 + 's';
      heart.style.fontSize = Math.random() * 16 + 14 + 'px';

      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, i * 90);
  }
}
