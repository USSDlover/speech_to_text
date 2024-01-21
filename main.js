/**
 * Speech to text AI Assistance
 */

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const transcriptP = document.getElementById('transcript');

let recognition;
let isRecording = false;
let currentText = '';

function startRecording() {
    console.log('Start Recording');
    recognition = new webkitSpeechRecognition();
    if (recognition) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = handleResult;
        recognition.start();
        isRecording = true;

        startButton.disabled = true;
        stopButton.disabled = false;
    } else {
        console.warn('Failed to start recording', recognition);
    }
}

function stopRecording() {
    recognition.stop();
    isRecording = false;

    startButton.disabled = false;
    stopButton.disabled = true;
}

/**
 * @param results = {
 *     number: {
 *         number: {};
 *         length: number;
 *         isFinal: boolean;
 *     },
 *     length: number;
 * }
 */
function joinTranscripts(results) {
    let transcript = '';
    for (let key in results) {
        if (key !== 'length' && key !== 'item') {
            transcript = transcript + results[key][0].transcript
        }
    }
    transcriptP.textContent = transcript;
    currentText = transcript;
}

function handleResult(event) {
    if (event.results) {
        console.log('Valid event', 'Results: ', event.results);
        joinTranscripts(event.results);
    } else {
        console.warn('The event is not valid', event, 'results', event.results);
    }
}

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

function handleCommand(command) {
    console.log('Command', command);
    switch (command) {
        case 'command.review':
            stopRecording();
            break;
        case 'command.read':
            readText();
            break;
        case 'command.confirm':
            saveTextToFile();
            break;
        case 'command.edit':
            // Implement edition functionality
            console.log('The edit functionality is not implemented');
            break;
        default:
            console.log('Command not found', command);
            break;
    }
}

function readText() {
    const speech = new SpeechSynthesisUtterance();
    speech.speak(currentText);
}

function saveTextToFile() {
    // Implement file saving logic with markdown formatting
    console.log('Save to file not implemented');
}

if (recognition) {
    // example of listening for commands
    recognition.onresult = (event) => {
        const transcript = event.results
            .map(res => res[0].transcript)
            .join('');

        if (transcript.includes('command.')) {
            const command = transcript.substring(transcript.indexOf('command.') + 8);
            handleCommand(command);
        }
    };
}

