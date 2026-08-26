const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");

// Your Render backend URL
const API_URL = "https://student-safety-system-8qh8.onrender.com";

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    if (type === "bot") {

        message.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="bubble"></div>
        `;

    } else {

        message.innerHTML = `
            <div class="bubble"></div>
        `;

    }

    message.querySelector(".bubble").textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    return message;
}


async function sendMessage() {

    const text = userInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    userInput.value = "";

    sendBtn.disabled = true;

    const botMessage =
        addMessage("Thinking... 🤖", "bot");

    try {

        const response = await fetch(
            `${API_URL}/api/chat`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: text
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Server error"
            );
        }

        botMessage.querySelector(
            ".bubble"
        ).textContent = data.reply;

    } catch (error) {

        console.error(
            "Backend connection error:",
            error
        );

        botMessage.querySelector(
            ".bubble"
        ).textContent =
            "Sorry, I couldn't connect to my AI backend. 🤖";

    } finally {

        sendBtn.disabled = false;

        userInput.focus();

    }
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