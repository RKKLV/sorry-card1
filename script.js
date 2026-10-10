// تتبع الظروف التي تم فتحها
let openedEnvelopes = new Set();

function nextStep(stepNumber) {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        if (stepNumber === 2) {
            document.getElementById('step-2').classList.add('active');
        }
    }, 180);
}

function openEnvelopeMsg(index, htmlContent) {
    // تسجيل الظرف المفتوح
    openedEnvelopes.add(index);

    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('message-text').innerHTML = htmlContent;
        document.getElementById('step-message').classList.add('active');
        
        const scrollArea = document.querySelector('#step-message .message-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    }, 180);
}

function backToEnvelopes() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-2').classList.add('active');
        
        // التحقق مما إذا تم فتح جميع الأظرف الـ 5 لإظهار رسالة النهاية السرية
        if (openedEnvelopes.size === 5) {
            document.getElementById('final-unlock-banner').classList.remove('hidden');
        }
    }, 180);
}

function goToFinalPage() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-final-1').classList.add('active');
        const scrollArea = document.querySelector('#step-final-1 .message-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    }, 180);
}

function goToFuturePage() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-final-2').classList.add('active');
        const scrollArea = document.querySelector('#step-final-2 .message-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    }, 180);
}

function backToEnvelopesFromFinal() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-2').classList.add('active');
    }, 180);
}
