function toggleConversations() {
    const conversations = document.getElementById('last-conversations');
    conversations.classList.toggle('active');
}

const chatMessages = document.getElementById('chat-messages');
const inputField = document.getElementById('user-input');

inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = inputField.value;
    if (userMessage === "") return;

    // Add user message to chat
    addMessage(userMessage, 'user-message');

    // Send request to FastAPI
    const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
    });

    const data = await response.json();
    const botMessage = data.response;

    // Add bot message to chat with typing animation
    addTypingMessage(botMessage, 'bot-message');

    // Clear input field and scroll to bottom
    inputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);
}

function addTypingMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    chatMessages.appendChild(messageElement);

    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < message.length) {
            messageElement.innerHTML += message.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 50); // Adjust the interval for typing speed
}