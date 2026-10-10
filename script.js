function nextStep(stepNumber) {
    const contents = document.querySelectorAll('.step-content');
    
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        if (stepNumber === 2) {
            document.getElementById('step-2').classList.add('active');
        }
    }, 180);
}

function openMessage(htmlContent) {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('message-text').innerHTML = htmlContent;
        document.getElementById('step-message').classList.add('active');
        // إعادة التمرير للأعلى عند فتح رسالة جديدة
        const scrollArea = document.querySelector('.message-scroll-area');
        if (scrollArea) scrollArea.scrollTop = 0;
    }, 180);
}

function backToEnvelopes() {
    const contents = document.querySelectorAll('.step-content');
    contents.forEach(el => el.classList.remove('active'));

    setTimeout(() => {
        document.getElementById('step-2').classList.add('active');
    }, 180);
}
