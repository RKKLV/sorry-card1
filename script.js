// عند الضغط لبدء القصة والانتقال للصفحة الثانية
startStoryBtn.addEventListener('click', async () => {
  playSound(523, 'triangle', 0.3);
  stageOne.classList.add('hidden');
  loveWindow.classList.remove('hidden');

  // إخفاء منطقة الأزرار مؤقتاً أثناء كتابة الكلام
  buttonsArea.classList.add('hidden');
  if (noBtn) noBtn.classList.add('hidden'); // إخفاء زر "لا" تماماً

  // 1. المقطع الأول
  await showSegment(
    "مامي\nأدري إنك رجعتي اليوم من دوامك وأنتي شايله من التعب يكفي يومين ونمتي قبل حتى ما تعطين نفسك فرصة انها تهدا",
    3500
  );

  // 2. المقطع الثاني
  await showSegment(
    "وأنا؟\nما قدرت أشوفك نايمة واعدي اليوم\n\nفقلت أسوي لك شيء صغير\nشي إذا فتحتيه بعد ما تصحين تحسين إن فيه أحد كان يفكر فيك وأنتي بعيدة عن الدنيا كلها",
    4000
  );

  // 3. المقطع الثالث
  await showSegment(
    "وما أبي منك شي\nلا رد ولا كلام ولا حتى تروقين عشاني\n\nأبيك بس تصحين وأنتي عارفة إن فيه قلب ينتبه لك حتى في الأشياء اللي ما تقولينها",
    4000
  );

  // 4. المقطع الرابع
  await showSegment(
    "وإذا كان يومك اليوم ثقيل\nخليه هنا\n\nتعالي خذي نفس واشربي مويا وعدّلي مخدتك\nوالباقي خلّيه علي",
    4000
  );

  // 5. المقطع الخامس (تبقى العبارة مكتوبة ويظهر معها الزر)
  await typeWriter("لان انتي مو مطالبة تكونين بخير طول الوقت يا مامي\nيكفي إنك أنتي ♥️.");
  await sleep(1500);

  // إظهار الزر الواحد الجديد
  yesBtn.textContent = "الحين كملي\nعندي لك شيء ثاني✨";
  yesBtn.style.width = "100%";
  yesBtn.style.fontSize = "12px";
  yesBtn.style.padding = "12px 8px";
  yesBtn.style.lineHeight = "1.5";

  buttonsArea.innerHTML = ''; // تفريغ الأزرار القديمة
  buttonsArea.appendChild(yesBtn); // إضافة الزر الوحيد
  buttonsArea.classList.remove('hidden');

  // عند الضغط على الزر الجديد للانتقال للخطوة التالية
  yesBtn.onclick = async () => {
    playSound(659, 'sine', 0.2);
    buttonsArea.classList.add('hidden');
    await animateTextOut();
    
    // هنا يكمل الكود للشيء الثاني الذي تمجهزه لها ✨
    // (مثلاً الانتقال للشاشة التالية أو كتابة المفاجأة الثانية)
  };
});
