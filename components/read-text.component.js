class ReadTextComponent extends HTMLElement {
    readTextButton;
    speechTextInput;
    selectVoiceInput;
    synth = window.speechSynthesis;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
                <section>
                    <h5>Text to Speech</h5>
                    <button id="read-text">Read Text</button>
                    <textarea rows="5" id="speech-text"></textarea>
                    <select id="select-voice">
                        <option value="null">Select the Voice</option>
                    </select>
                </section>
            `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.readTextButton = this.shadowRoot.getElementById('read-text');
        this.speechTextInput = this.shadowRoot.getElementById('speech-text');
        this.selectVoiceInput = this.shadowRoot.getElementById('select-voice');

        this.readTextButton.addEventListener('click', this.readTextLoud.bind(this));

        this.addAvailableVoicesDropDown();
    }

    disconnectedCallback() {
        this.readTextButton.removeEventListener('click', this.readTextLoud);
    }

    addAvailableVoicesDropDown() {
        // TODO: Implement a solution to add available voices to the dropdown
        const availableVoices = this.synth.getVoices();
        console.log('Available voices', availableVoices);
    }

    readTextLoud() {
        const textContent = this.speechTextInput.value;
        const speech = new SpeechSynthesisUtterance(textContent);
        this.synth.speak(speech);
    }
}

customElements.define('read-text-component', ReadTextComponent);
