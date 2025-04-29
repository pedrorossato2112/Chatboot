const chat = document.getElementById("chat");
let ultimaIntencao = null;
let estadoConversa = null;

const respostas = {
  "manutenção": "A manutenção dos celulares acontece quando há algum problema com o aparelho. Gostaria de solicitar uma manutenção?",
};

const respostasContinuidade = {
  "manutenção": "Certo, me passe seu nome completo por gentileza e o número do imobilizado do celular para identificação.",
};

const afirmacoes = ["sim", "sim, por favor", "sim gostaria", "sim, gostaria, por favor", "gostaria sim", "quero", "desejo"];

function sendMessage() {
  const input = document.getElementById("userInput");
  const msgOriginal = input.value.trim();
  const msg = msgOriginal.toLowerCase();
  if (!msg) return;

  addMessage("Você", msgOriginal, "user");

  let resposta = "Desculpe, não entendi. Pode reformular?";
  let encontrou = false;

  if (estadoConversa === "aguardandoDados") {
    const imobilizado = msgOriginal.match(/\d{6,}/); 
    const nome = msgOriginal.match(/[A-Z][a-z]+/); 

    if (imobilizado && nome) {
      resposta = `Obrigado ${nome[0]}, sua solicitação de manutenção para o celular com o imobilizado ${imobilizado[0]} foi registrada.`;
    } else {
      resposta = "Por favor, informe o nome com a primeira letra maiúscula e o número do imobilizado com pelo menos 6 dígitos.";
    }

    estadoConversa = null;
    ultimaIntencao = null;
    encontrou = true;
  }

  else if (estadoConversa === "aguardandoConfirmacao") {
    for (const afirmacao of afirmacoes) {
      if (msg.includes(afirmacao)) {
        resposta = respostasContinuidade[ultimaIntencao];
        estadoConversa = "aguardandoDados";
        encontrou = true;
        break;
      }
    }
  }
 
  else {
    for (const chave in respostas) {
      if (msg.includes(chave)) {
        resposta = respostas[chave];
        ultimaIntencao = chave;
        estadoConversa = "aguardandoConfirmacao";
        encontrou = true;
        break;
      }
    }
  }

  setTimeout(() => {
    addMessage("Assistente", resposta, "bot");
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
