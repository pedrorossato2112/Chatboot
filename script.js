const chat = document.getElementById("chat");

const respostas = {
  "outros": "Você escolheu Outros. Qual tipo de ajuda você precisa?",
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
  const msg = input.value.trim();
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

  salvarMensagem(autor, texto, classe);
}

function salvarMensagem(autor, texto, classe) {
  const historico = JSON.parse(localStorage.getItem("historicoChat")) || [];
  historico.push({ autor, texto, classe });
  localStorage.setItem("historicoChat", JSON.stringify(historico));
}

function carregarMensagens() {
  const historico = JSON.parse(localStorage.getItem("historicoChat")) || [];
  historico.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("msg", msg.classe);
    div.innerText = `${msg.autor}: ${msg.texto}`;
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
}

function limparHistorico() {
  localStorage.removeItem("historicoChat");
  chat.innerHTML = "";
}

carregarMensagens();
