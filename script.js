/*
  Uso de IA: ChatGPT foi utilizado como apoio para estruturar o exemplo,
  explicar e revisar HTML, CSS e JavaScript. Personalize e entenda o código
  antes da apresentação individual.
*/

// Abre ou fecha o menu no celular e atualiza seu estado acessível.
const menuBotao = document.querySelector("#menuBotao");
const menuNavegacao = document.querySelector("#menuNavegacao");

menuBotao.addEventListener("click", () => {
  const menuEstaAberto = menuNavegacao.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(menuEstaAberto));
  menuBotao.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu móvel quando uma seção é escolhida.
menuNavegacao.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuNavegacao.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    menuBotao.setAttribute("aria-label", "Abrir menu");
  });
});

// Retorna uma saudação de acordo com a hora recebida.
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia!";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde!";
  }
  return "Boa noite!";
}

document.querySelector("#saudacao").textContent = obterSaudacao(new Date().getHours());

// Alterna o tema visual e atualiza o nome acessível do botão.
const temaBotao = document.querySelector("#temaBotao");
temaBotao.addEventListener("click", () => {
  document.body.classList.toggle("modo-claro");
  const temaClaroAtivo = document.body.classList.contains("modo-claro");
  temaBotao.setAttribute("aria-label", temaClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro");
  temaBotao.textContent = temaClaroAtivo ? "☾" : "☼";
});

// Mostra ou limpa uma mensagem de erro associada ao campo.
function mostrarErro(campo, mensagem, idErro) {
  const elementoErro = document.querySelector(`#${idErro}`);
  elementoErro.textContent = mensagem;
  if (campo.type === "checkbox") {
    campo.setAttribute("aria-invalid", String(Boolean(mensagem)));
  } else {
    campo.setAttribute("aria-invalid", String(Boolean(mensagem)));
  }
}

// Verifica os campos do formulário e informa os erros na própria página.
function validarFormulario() {
  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const mensagem = document.querySelector("#mensagem");
  const consentimento = document.querySelector("#consentimento");
  let formularioValido = true;

  mostrarErro(nome, nome.value.trim() ? "" : "Informe seu nome.", "erroNome");
  mostrarErro(email, "", "erroEmail");
  mostrarErro(mensagem, "", "erroMensagem");
  mostrarErro(consentimento, "", "erroConsentimento");

  if (!nome.value.trim()) {
    formularioValido = false;
  }

  const emailInformado = email.value.trim();
  if (!emailInformado) {
    mostrarErro(email, "Informe seu e-mail.", "erroEmail");
    formularioValido = false;
  } else if (!emailInformado.includes("@") || !emailInformado.includes(".")) {
    mostrarErro(email, "Digite um e-mail que contenha @ e ponto.", "erroEmail");
    formularioValido = false;
  }

  if (!mensagem.value.trim()) {
    mostrarErro(mensagem, "Escreva uma mensagem.", "erroMensagem");
    formularioValido = false;
  } else if (mensagem.value.trim().length < 20) {
    mostrarErro(mensagem, "A mensagem precisa ter pelo menos 20 caracteres.", "erroMensagem");
    formularioValido = false;
  }

  if (!consentimento.checked) {
    mostrarErro(consentimento, "Marque o consentimento para continuar.", "erroConsentimento");
    formularioValido = false;
  }

  return formularioValido;
}

const formContato = document.querySelector("#formContato");
const mensagemSucesso = document.querySelector("#mensagemSucesso");

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagemSucesso.textContent = "";

  if (validarFormulario()) {
    mensagemSucesso.textContent = "Mensagem validada! Este formulário é demonstrativo e não envia seus dados.";
    formContato.reset();
    document.querySelectorAll(".erro").forEach((erro) => {
      erro.textContent = "";
    });
    formContato.querySelectorAll("[aria-invalid]").forEach((campo) => {
      campo.setAttribute("aria-invalid", "false");
    });
  }
});

// Insere automaticamente o ano atual no rodapé.
document.querySelector("#anoAtual").textContent = new Date().getFullYear();
