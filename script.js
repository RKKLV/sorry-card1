// ==========================================
// العناصر الأساسية
// ==========================================
const loadingScreen = document.getElementById('loadingScreen');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

const diagnosisScreen = document.getElementById('diagnosisScreen');
const startTreatmentBtn = document.getElementById('startTreatmentBtn');

const stageOne = document.getElementById('stageOne');
const startStoryBtn = document.getElementById('startStoryBtn');

const loveWindow = document.getElementById('loveWindow');
const storyText = document.getElementById('storyText');
const textContainer = document.getElementById('textContainer');
const buttonsArea = document.getElementById('buttonsArea');
const actionBtn = document.getElementById('actionBtn');

const teaserScreen = document.getElementById('teaserScreen');
const teaserBtn = document.getElementById('teaserBtn');

const logoutScreen = document.getElementById('logoutScreen');
const logoutProgressFill = document.getElementById('logoutProgressFill');

const finalQuietScreen = document.getElementById('finalQuietScreen');
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
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// 1. تشغيل العداد التلقائي
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;

    progressText.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        diagnosisScreen.classList.remove('hidden');
      }, 600);
    }
  }, 35);
});

// ==========================================
// 2. الانتقال من شاشة التشخيص للرئيسية
// ==========================================
startTreatmentBtn.addEventListener('click', () => {
  playSound(523, 'triangle', 0.2);
  diagnosisScreen.classList.add('hidden');
  stageOne.classList.remove('hidden');
});

// ==========================================
// دوال الكتابة والمسح
// ==========================================
async function typeWriter(text, speed = 45) {
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

async function backspaceText(speed = 50) {
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
// 3. التفاعل وسلسلة القصة
// ==========================================
startStoryBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  loveWindow.classList.remove('hidden');
  buttonsArea.classList.add('hidden');

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

  // المقطع 5
  await typeWriter("لان انتي مو مطالبة تكونين بخير طول الوقت يا مامي\nيكفي إنك أنتي ♥️.");
  await sleep(1200);

  // إعداد الزر الأول
  showActionButton("الحين كملي\nعندي لك شيء ثاني✨", async () => {
    buttonsArea.classList.add('hidden');
    await animateTextOut();

    await showSegment(
      "مامي، تعرفين وش أكثر شي أحبه فيك؟\nمو شيء واحد\nالمشكلة إني كل ما حاولت أختار شي\nيطلع لي شيء ثاني ويقول\nوأنا؟\n\nفأكتشف إني ما أحب فيك تفصيله وبس\nأنا أحب الطريقة اللي تصيرين فيها أنتي بكل تفاصيلك",
      4500
    );

    await showSegment(
      "أحبك وأنتي رايقه\nوأحبك وأنتي هلكانة وتبين تنامين\n\nأحب سوالفك اللي ما لها بداية ولا نهاية\nوأحب حتى صمتك اللي أحيانا أفهمه قبل لا تقولينه",
      4500
    );

    await showSegment(
      "وأحب إنك جودي واحب انك مامتي الحمدلله يارب\n\nلأن ما فيه نسخة ثانية منك أقدر أحطها مكانك. ♥️",
      4000
    );

    // الانتقال لصفحة التشويق
    loveWindow.classList.add('pixel-fade-out');
    await sleep(500);
    loveWindow.classList.add('hidden');
    teaserScreen.classList.remove('hidden');
  });
});

// ==========================================
// 4. ضغط زر "اضغطي✨" من شاشة التشويق
// ==========================================
teaserBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  teaserScreen.classList.add('hidden');
  loveWindow.classList.remove('hidden');
  loveWindow.classList.remove('pixel-fade-out');
  storyText.textContent = '';

  // خيال المشكلة الحقيقية والحذف
  await typeWriter("هنا تبدأ المشكلة الحقيقية");
  await sleep(1000);
  await backspaceText();
  await sleep(500);

  // نص جودي والكلام المرتب
  await typeWriter(
    "جودي\nأنا كنت ناوي أكتب لك كلام مرتب\nكلام أعرف وين يبدأ ووين ينتهي\n\nبس شفتك\nومن بعدها كل الكلام اللي كنت مجهزه صار قليل،\nوصرت أنا اللي أحتاج أحد يشرح لي وش أسوي بجمال كل ما حاولت أوصفه زاد علي\n\nأنتي مو من النوع اللي تنقال له يا جميلة وخلاص\nالجمال عندك مو صفه الجمال عندك حالة تصير لي\n\nأشوفك وأحس إن عيني ما عاد عندها رأي \nتروح لك من نفسها\n\nوأجلس أطالعك وأقول بيني وبين نفسي\n\nوش هالورطة الحلوة اللي اسمها جودي."
  );

  showActionButton("عبالك خلصنا؟ لا تعالي مامي😋", handleHairAndEyesStep);
});

// ==========================================
// 5. خطوة الشعر والعيون مع التوقفات الزمنية
// ==========================================
async function handleHairAndEyesStep() {
  buttonsArea.classList.add('hidden');
  await animateTextOut();

  await typeWriter(
    "وأجي لشعرك وهنا تحديدًا أنا ما عندي دفاع\nهالشعر اللي ما أدري وش سره\nكل خصلة فيه كأنها تعرف بالضبط كيف تخليني أطالع أكثر من المفروض\n\nوكذا ينسدل عليك كأنه مو شعر\nكأنه ظلّ أسود اختار أجمل مكان بالدنيا وسكن فيه\n\nووجهك؟\nاهههخخخ يا بنت الحلال وجهك ما ينشاف مرور الكرام\n\nكذا فيه شي يخلي الواحد يرجع يطالع مرة ثانيه\nمو لأنه ما شافه\n\nلأنه شافه وما صدّق إن الحلا ممكن يجتمع بهالهدوء\n\nوعيونك بالذات "
  );

  // انتظر ثواني
  await sleep(2500);
  await typeWriter("دقيقه اشوفهم ");

  // انتظر 5 ثواني بالتمام والكمال
  await sleep(5000);

  await typeWriter(
    "\n\nاههههههخخخخخخخخخخخخخخخخخخخخ\nعيونك ما تحتاج تسوين فيها شي لان تكفي نظرة منك\nوتلقين واحد مثلي ناسي وش كان بيقول."
  );

  await sleep(4000);
  await animateTextOut();

  // المقطع التالي تلقائياً
  await showSegment(
    "بس تدريـن وش أكثر شيء يجنني فيك؟\n\nإنك ما تحسين بحجم تأثيرك\n\nتمشين تتكلمين تضحكين تعدلين شعرك \nوتسّوين أشياء بالنسبة لك عادية مره\nوأنا أشوفها كأن أحد قاعد يختبر صبري \nأنتي ما تتزينين عشان تصيرين حلوه\nأنتي أصلًا حلوة وكل شيء فيك يجي بعدك\n\nحتى دلالك ما أشوفه دلال \n\nأشوفه طريقة ثانية من طرقك في احتلال قلبي\nبدون ما ترفعين يدك عليه.",
    4500
  );

  await typeWriter("واللي يضحكني إني للحين ما قلت لك عن أكثر شي فيك يضيّعني");

  showActionButton("كمّلي يا مامي♥️", handleFinalPartStep);
}

// ==========================================
// 6. الجزء الأخير والإنهاء
// ==========================================
async function handleFinalPartStep() {
  buttonsArea.classList.add('hidden');
  await animateTextOut();

  await showSegment(
    "يمكن وأنا أكتب لك كنت أتكلم عن شعرك وعيونك، وملامحك ودلالك\nبس الحقيقة إن كل هذي الأشياء ما هي السبب اللي خلاني أطيح فيك\n\nهي بس الأشياء اللي أقدر أشوفها\n\nأما اللي ما أشوفه\nفهو السبب اللي كل يوم يخليني أختارك من جديد\n\nطريقتك\nصوتك\nقلبك\nزعلك\nضحكتك\nوحتى الأيام اللي ما تكونين فيها بخير",
    4500
  );

  await typeWriter(
    "أحبك مو لأنك أجمل بنت شفتها عيوني \nأحبك لأن عيوني من يوم عرفتك صارت تعرف وش تبي تشوف\n\nوأبيك إذا صحيتي اليوم، وبعد ما خلصتي كل هالصفحات،\nتعرفين إن فيه شخص ما كان يقدر يصلّح تعب يومك\n\nفحاول يصنع لك دقيقة حلوة بدلها\n\nوإذا ابتسمتي الحين ولو ابتسامة صغييييره \n\nف انا كسبت يومي كله ♥️\n\nنامي إذا رجع لك التعب\nوارتاحي إذا ضاق صدرك\nوتعالي لي إذا احتجتي أحد\n\nريانك هنا\nمو بس في هالصفحه\n\nريان لمامي اللي أحبها أكثر من اني أعرف أقول ♥️"
  );

  showActionButton("إنهاء 🥀", handleLogoutAndEnd);
}

// ==========================================
// 7. تسجيل الخروج والنهاية الهادئة جداً
// ==========================================
async function handleLogoutAndEnd() {
  playSound(440, 'sine', 0.3);
  loveWindow.classList.add('pixel-fade-out');
  await sleep(500);
  loveWindow.classList.add('hidden');

  // إظهار شاشة تسجيل الخروج
  logoutScreen.classList.remove('hidden');
  let p = 0;
  const timer = setInterval(() => {
    p += 10;
    logoutProgressFill.style.width = p + '%';
    if (p >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        logoutScreen.classList.add('hidden');
        finalQuietScreen.classList.remove('hidden');
        rainHearts();
      }, 500);
    }
  }, 180);
}

// ==========================================
// أدوات مساعدة
// ==========================================
function showActionButton(text, onClick) {
  actionBtn.textContent = text;
  buttonsArea.innerHTML = '';
  buttonsArea.appendChild(actionBtn);
  buttonsArea.classList.remove('hidden');
  actionBtn.onclick = onClick;
}

function rainHearts() {
  if (!heartsContainer) return;
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('falling-heart');
      heart.textContent = ['♥️', '🌸', '✨', '🍵'][Math.floor(Math.random() * 4)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 3 + 3 + 's';
      heart.style.fontSize = Math.random() * 14 + 12 + 'px';

      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, i * 150);
  }
}
