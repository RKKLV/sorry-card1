function nextStep(stepNumber) {
    const contents = document.querySelectorAll('.step-content');
    
    // إخفاء الكل بسلاسة
    contents.forEach(el => el.classList.remove('active'));

    // إظهار الخطوة المطلوبة بعد جزء من الثانية لتفعيل الأنيميشن
    setTimeout(() => {
        if (stepNumber === 2) {
            document.getElementById('step-2').classList.add('active');
        }
    }, 180);
}

function openMessage(text) {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('message-text').innerText = text;
        document.getElementById('step-message').classList.add('active');
    }, 180);
}

function backToEnvelopes() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-2').classList.add('active');
    }, 180);
}
