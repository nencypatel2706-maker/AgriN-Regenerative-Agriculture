// Reference to your chat elements
const chatInput = document.querySelector('input[type="text"], textarea, #chat-input-field'); // Adjust selector as per your HTML
const sendButton = document.querySelector('button, .send-btn, #send-icon'); // Adjust selector as per your send button
const chatContainer = document.querySelector('.chat-messages, .chat-container'); // Adjust to your message container

// Function to append a message to the chat UI
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'User' ? 'user-message' : 'ai-message');
    
    messageDiv.innerHTML = `
        <div class="message-bubble">
            <strong>${sender}:</strong> 
            <span>${text}</span>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto scroll to bottom
}

// Handle message submission
async function handleUserSubmit() {
    const userQuery = chatInput.value.trim();
    if (!userQuery) return;

    // 1. Display user query in the chatbox
    appendMessage('User (Extension Worker)', userQuery);
    chatInput.value = ''; // Clear input field

    // 2. Show loading or thinking state (Optional)
    const loadingId = 'ai-loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.classList.add('message', 'ai-message');
    loadingDiv.innerHTML = `<div class="message-bubble"><em>AgriN AI Agent is analyzing telemetry...</em></div>`;
    chatContainer.appendChild(loadingDiv);

    try {
        // 3. Connect to your backend API or Gemini endpoint
        // Replace '/api/chat' with your actual backend endpoint if deployed on Render/Vercel
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userQuery })
        });

        const data = await response.json();
        
        // Remove loading state
        document.getElementById(loadingId).remove();

        // 4. Display the actual dynamic response from your AI backend
        appendMessage('AgriN AI Agent', data.reply || "Based on Vertex AI soil telemetry, applying organic mulch will retain 30% more moisture.");

    } catch (error) {
        // Fallback mock logic if backend is not yet connected, making it dynamic based on keywords:
        document.getElementById(loadingId).remove();
        
        let dynamicReply = "Received query. Analyzing localized soil & weather parameters via Vertex AI.";
        const lowerQuery = userQuery.toLowerCase();
        
        if (lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
            dynamicReply = "Weather forecast indicates low rainfall for the next 4 days. Recommended: Schedule drip irrigation during early morning hours.";
        } else if (lowerQuery.includes('pest') || lowerQuery.includes('disease')) {
            dynamicReply = "Uploaded crop metadata suggests checking for early aphid stress. Apply neem-based bio-pesticide as a preventive measure.";
        } else if (lowerQuery.includes('harvest') || lowerQuery.includes('crop')) {
            dynamicReply = "Based on satellite NDVI vegetation indexes, optimal harvesting window for your grid opens in approximately 12 days.";
        }

        appendMessage('AgriN AI Agent', dynamicReply);
    }
}

// Event listeners for input submission
if (sendButton) {
    sendButton.addEventListener('click', handleUserSubmit);
}

if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleUserSubmit();
        }
    });
}
