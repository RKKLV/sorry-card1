function nextStep(step) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    if (step === 2) {
        document.getElementById('step-2').classList.remove('hidden');
    }
}

function openMessage(text) {
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-message').classList.remove('hidden');
    document.getElementById('message-text').innerText = text;
}

function backToEnvelopes() {
    document.getElementById('step-message').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');
}
