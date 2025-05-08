// Exemplo básico de interação
function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat");
  const messageElement = document.createElement("div");
  messageElement.classList.add("msg", "user");
  messageElement.innerHTML = `<strong>Cliente:</strong> ${msg}`;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;

  // A lógica de resposta do atendente pode ser personalizada aqui
  setTimeout(() => {
    const responseElement = document.createElement("div");
    responseElement.classList.add("msg", "bot");
    responseElement.innerHTML = `<strong>Atendente:</strong> Oi, como posso te ajudar?`;
    chat.appendChild(responseElement);
    chat.scrollTop = chat.scrollHeight;
  }, 1000);

  input.value = "";
}

document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function clearChat() {
  document.getElementById("chat").innerHTML = "";
}
