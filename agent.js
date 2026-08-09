const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");


function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    if (type === "bot") {

        message.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="bubble">${text}</div>
        `;

    } else {

        message.innerHTML = `
            <div class="bubble">${text}</div>
        `;

    }

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function sendMessage() {

    const text =
        userInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    userInput.value = "";

    setTimeout(() => {

        addMessage(
            "I'm currently being built 🤖. Soon I'll be able to answer your questions using an AI model.",
            "bot"
        );

    }, 500);
}


function quickAsk(text) {

    userInput.value = text;

    sendMessage();
}


sendBtn.addEventListener(
    "click",
    sendMessage
);


userInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);