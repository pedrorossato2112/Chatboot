const chat = document.getElementById("chat");

const respostas = {
  "manutenção": "Claro! Você quer registrar uma manutenção? Posso te ajudar com isso.",
  "recebimento": "Você selecionou Recebimento. Deseja registrar a chegada de algum item?",
  "expedição": "Você selecionou Expedição. Qual informação você precisa?",
  "transporte": "Você selecionou Transporte. Deseja registrar ou consultar algum envio?"
};

function iniciarConversa(topico) {
  const resposta = respostas[topico] || "Desculpe, não entendi esse tópico.";
  addMessage("Você", `Opção escolhida: ${topico}`, "user");
  setTimeout(() => {
    addMessage("Assistente", resposta, "bot");
  }, 500);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim().toLowerCase();
  if (!msg) return;
  addMessage("Você", msg, "user");

  setTimeout(() => {
    addMessage("Assistente", "carma la", "bot");
  }, 500);

  input.value = "";
}

function addMessage(autor, texto, classe) {
  const msg = document.createElement("div");
  msg.classList.add("msg", classe);
  msg.innerText = `${autor}: ${texto}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}