// العناصر
const stageOne = document.getElementById('stageOne');
const startStoryBtn = document.getElementById('startStoryBtn');
const loveWindow = document.getElementById('loveWindow');
const windowBody = document.getElementById('windowBody');
const storyText = document.getElementById('storyText');
const textContainer = document.getElementById('textContainer');
const buttonsArea = document.getElementById('buttonsArea');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const nextPhaseBtn = document.getElementById('nextPhaseBtn');
const pixelCat = document.querySelector('.pixel-cat');
const finalScreen = document.getElementById('finalScreen');
const heartsContainer = document.getElementById('heartsContainer');

// الأصوات
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type, duration) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeWriter(text, speed = 45) {
  for (let i = 0; i < text.length; i++) {
    storyText.textContent += text.charAt(i);
    textContainer.scrollTop = textContainer.scrollHeight;

    if (text.charAt(i) !== ' ' && text.charAt(i) !== '\n') {
      playSound(450, 'sine', 0.03);
    }
    await sleep(speed);
  }
}

async function backspaceText(speed = 60) {
  while (storyText.textContent.length > 0) {
    storyText.textContent = storyText.textContent.slice(0, -1);
    playSound(350, 'square', 0.03);
    await sleep(speed);
  }
}

async function animateTextOut() {
  playSound(220, 'square', 0.15);
  textContainer.classList.add('pixel-fade-out');
  await sleep(450);
  storyText.textContent = '';
  textContainer.scrollTop = 0;
  textContainer.classList.remove('pixel-fade-out');
  textContainer.classList.add('pixel-fade-in');
  setTimeout(() => textContainer.classList.remove('pixel-fade-in'), 450);
}

async function showSegment(text, pauseTime = 2500) {
  await typeWriter(text);
  await sleep(pauseTime);
  await animateTextOut();
}

async function catHappyAnimation() {
  pixelCat.classList.add('cat-happy');
  playSound(800, 'sine', 0.2);
  await sleep(1500);
  pixelCat.classList.remove('cat-happy');
}

// دالة إبعاد الزر الهارب (تتأقلم مع أي زر يتم تمريره)
function setupDodge(btnToDodge) {
  function dodge() {
    playSound(280, 'sawtooth', 0.1);
    const bodyRect = windowBody.getBoundingClientRect();
    const btnRect = btnToDodge.getBoundingClientRect();
    const padding = 15;

    const maxX = bodyRect.width - btnRect.width - padding;
    const maxY = bodyRect.height - btnRect.height - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(120, Math.floor(Math.random() * maxY));

    btnToDodge.style.position = 'absolute';
    btnToDodge.style.left = `${randomX}px`;
    btnToDodge.style.top = `${randomY}px`;
  }

  btnToDodge.onmouseenter = dodge;
  btnToDodge.ontouchstart = (e) => { e.preventDefault(); dodge(); };
}

// 1. الشاشة الأولى
startStoryBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  loveWindow.classList.remove('hidden');

  await typeWriter("يا جودي\nتدري وش أغرب شيء بثلاث شهور هذي؟");
  
  // في السؤال الأول: زر "لا" هو الصحيح، وزر "إي" هو الذي يهرب
  yesBtn.style.position = 'static';
  setupDodge(yesBtn);
  buttonsArea.classList.remove('hidden');
});

// 2. ضغط زر "لا" الأول (الآن أصبح هو الصحيح في السؤال الأول)
noBtn.addEventListener('click', async () => {
  playSound(659, 'sine', 0.2);
  buttonsArea.classList.add('hidden');
  storyText.textContent = '';
  yesBtn.onmouseenter = null;
  yesBtn.ontouchstart = null;
  yesBtn.style.position = 'static';

  await showSegment("إني كنت أحسب الأيام هي اللي تمشي وأثرك انتي اللي كنتي تمشين فيني يوم بعد يوم\nشوي من ضحكتك هنا\nشوي من صوتك هناك\nنظرة منك علقت بمكاني\nوكلمة منك للحين كل ما تذكرتها ابتسمت كأني أسمعها أول مره\n\nلين صارت الشهور ما عاد شهور\n\nصارت أنتي", 3500);
  await showSegment("وأدري إنك زعلانة مني الحين\nوأعرف إن فيه بخاطرك شي\nبس والله ما أبي أجيك بكلمتين محفوظة وأقول \nخلاص لا تزعلين \nأبيك تزعلين لو بخاطرك زعل\nبس أبي أكون أنا اللي يهوّن عليك هالزعل\nأبي إذا ضاق صدرك تلقين لي مكان\nوإذا عاندك قلبك تلقينني عنده\nوإذا قلتي ما أبي أكلمك \nأكون فاهم إن بعض ما أبي منك تحتاج حضن مو جواب", 3500);
  await showSegment("وأنتي يا بنت\nمن قال لك إن قلبي يعرف يخاصمك أصلا؟\nأنا إذا زعلتي أجلس أفتش في ملامحك عن جودي اللي أعرفها وألقى نفسي أحبك أكثر وأنا أدور", 3000);
  await showSegment("يا حلوتي\nأنا ما أبي منك الحين تسامحينني عشان الصفحة حلوه\nولا أبيك تنسين اللي ضايقك عشان خاطري", 3000);
  await showSegment("أبيك بس تبتسمين\nولو ابتسامتك طلعت صغيره\nترى أنا آخذها كاملة\nوأعتبرها أول صلح بيننا ♥️", 3500);

  textContainer.classList.add('hidden');
  nextPhaseBtn.classList.remove('hidden');
});

// 3. ضغط زر (طيب… تعالي الحين 🫴🏻)
nextPhaseBtn.addEventListener('click', async () => {
  playSound(587, 'sine', 0.2);
  nextPhaseBtn.classList.add('hidden');
  textContainer.classList.remove('hidden');

  await typeWriter("خليني أدلعك شوي\nترى لي من اليوم وأنا محروم من جودي اللي تذوب إذا دلعتها.");
  await sleep(2500);
  await animateTextOut();

  await typeWriter("دلوعتي");
  await sleep(1500);
  await backspaceText();

  await typeWriter("لا… مامي");
  await sleep(1500);
  await backspaceText();

  await typeWriter("لا… محبوبتي");
  await sleep(1500);
  await backspaceText();

  await typeWriter("لا… جودي");
  await sleep(1500);
  await backspaceText();

  await typeWriter("لا… معشوقتي");
  await sleep(1500);
  await backspaceText();

  await sleep(2000);
  await typeWriter("افففف… احترت وش أناديك");
  await sleep(2500);

  await typeWriter("\n\nهممم…");
  await sleep(1500);
  await backspaceText();

  await typeWriter("خلاص عرفت.");
  await sleep(1500);
  await animateTextOut();

  await typeWriter("دلوعتي\n");
  await sleep(400);
  await typeWriter("مامي\n");
  await sleep(400);
  await typeWriter("محبوبتي\n");
  await sleep(400);
  await typeWriter("جودي\n");
  await sleep(400);
  await typeWriter("معشوقتي");
  await sleep(2500);
  await animateTextOut();

  await typeWriter("كل هذي لك بس باقي سؤال واحد.");
  await sleep(2500);
  await animateTextOut();

  storyText.classList.add('big-question');
  await typeWriter("تحبّيني؟");
  
  // في باقي الأسئلة: زر "إي" هو الصحيح وزر "لا" هو الهارب
  yesBtn.textContent = "إي";
  noBtn.style.position = 'static';
  setupDodge(noBtn);
  buttonsArea.classList.remove('hidden');

  setupQuestionFlow();
});

// إدارة الأسئلة اللاحقة (حيث زر "إي" هو الصحيح وزر "لا" يهرب)
// 1. الشاشة الأولى
startStoryBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  loveWindow.classList.remove('hidden');

  // بداية الكلام فور الفتح
  await typeWriter("صح النوم يا حلوتي 🛌🤍\n\nنوم العافية يا رب، أدري إنك جيتي من الدوام هلكانة وتعبانة وتستاهلين يرتاح خاطرك..");
  await sleep(2500);

  buttonsArea.classList.remove('hidden');
});

// 2. إدارة الأسئلة والكلام الداعم بعد الدوام
function setupQuestionFlow() {
  let step = 1;

  const newYesBtn = yesBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

  newYesBtn.addEventListener('click', async () => {
    playSound(659, 'sine', 0.2);
    buttonsArea.classList.add('hidden');
    noBtn.style.position = 'static';
    noBtn.classList.add('hidden');

    await animateTextOut();
    await catHappyAnimation();

    if (step === 1) {
      step = 2;
      storyText.classList.remove('big-question');
      await typeWriter("عساك ارتحتي بشويش بالنوم؟ 🥺");
      newYesBtn.textContent = "إي الحمد لله 🤍";
      
      noBtn.textContent = "لسه تعبانة 🥺";
      noBtn.classList.remove('hidden'); // زر يهرب لطيف
      buttonsArea.classList.remove('hidden');
    } else if (step === 2) {
      step = 3;
      await typeWriter("يعني الحين التعب خفّ ولا باقي الدوام يغث؟");
      newYesBtn.textContent = "راخ التعب خلاص ♥️";
      buttonsArea.classList.remove('hidden');
    } else if (step === 3) {
      step = 4;
      await typeWriter("يا عمري أنتي..\nوالله لو التعب ينشال ويكبر ويصير إنسان، كان رحنا نتطاق معه عشان يخليك بسلامتك!");
      newYesBtn.textContent = "ههههههههه ياعمري 🥹";
      buttonsArea.classList.remove('hidden');
    } else if (step === 4) {
      // الرسالة الرئيسية الحنونة
      buttonsArea.classList.add('hidden');
      storyText.classList.remove('big-question');
      await animateTextOut();

      await typeWriter("جودي 🤍\n\nحبيت أترك لك هالصفحة الصغيره هنا، عشان أول ما تفتحي عينك وتشوفين جوالك، تلقين شي يبتسم له قلبك قبل عينك.\n\nأدري إن أوقات الدوام والتعب يهدّون الحيل، بس أبيك تتذكرين إن فيه أحد ينتظرك ترتاحين، ويحبك بأبسط تفاصيلك وأنتي تعبانة وأنتي رايقة.");
      await sleep(5000);
      await animateTextOut();

      await typeWriter("أنتي ألطف وأجمل شي يصير باليوم، وكل تعب تكابدينه ترى وراه قلب يدعي لك ويبيك دايماً بخير ومرتاحة.\n\nوالحين خلاص.. شبعتي نوم ولا نرجع ننام؟ 💆🏻‍♀️");
      await sleep(4000);
      await animateTextOut();

      await typeWriter("الحمد لله على سلامتك من تعب الدوام يا حلوة ♥️");
      await sleep(2000);

      newYesBtn.textContent = "تعال أدلعك 🫴🏻✨";
      newYesBtn.style.margin = "10px auto 0 auto";
      buttonsArea.innerHTML = '';
      buttonsArea.appendChild(newYesBtn);
      buttonsArea.classList.remove('hidden');

      newYesBtn.onclick = async () => {
        buttonsArea.classList.add('hidden');
        await animateTextOut();
        
        loveWindow.classList.add('pixel-fade-out');
        await sleep(500);
        loveWindow.classList.add('hidden');
        
        finalScreen.classList.remove('hidden');
        rainHearts();
      };
    }
  });
}


function rainHearts() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('falling-heart');
      heart.textContent = ['♥️', '💖', '💕', '🌸'][Math.floor(Math.random() * 4)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 2 + 1.5 + 's';
      heart.style.fontSize = Math.random() * 20 + 12 + 'px';
      
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 3500);
    }, i * 80);
  }
}
