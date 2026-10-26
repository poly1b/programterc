// Base com as 10 Perguntas completas solicitadas
const questionsData = [
  {
    id: 1,
    title: "Se você pudesse escolher qualquer raça de cachorro para ter hoje, qual seria?",
    icon: "fa-dog",
    color: "linear-gradient(135deg, #ec4899, #f43f5e)",
    chipColor: "#ec4899",
    options: ["Golden Retriever", "Border Collie", "Bulldog Francês", "Vira-lata Caramelo", "Pastor Alemão", "Husky Siberiano", "Pug"]
  },
  {
    id: 2,
    title: "Por que você gostaria de ter especificamente essa raça?",
    icon: "fa-heart",
    color: "linear-gradient(135deg, #f43f5e, #fb7185)",
    chipColor: "#f43f5e",
    options: ["Super leal e carinhoso", "Muito inteligente e esperto", "Perfeito para apartamento", "Energia para me acompanhar", "Acho lindo e fofo"]
  },
  {
    id: 3,
    title: "Você prefere cachorros de porte pequeno, médio ou grande? Por quê?",
    icon: "fa-ruler-combined",
    color: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    chipColor: "#8b5cf6",
    options: ["Porte Pequeno (fácil de levar)", "Porte Médio (ideal e versátil)", "Porte Grande (para abraçar)", "Qualquer um com amor"]
  },
  {
    id: 4,
    title: "Que nome você daria para o seu cachorro dos sonhos?",
    icon: "fa-tag",
    color: "linear-gradient(135deg, #6366f1, #3b82f6)",
    chipColor: "#6366f1",
    options: ["Thor", "Luna", "Pipoca", "Caramelo", "Bob", "Mel", "Zeus", "Paçoca"]
  },
  {
    id: 5,
    title: "Você prefere um cachorro mais agitado para brincar e correr ou um bem calmo para ficar no sofá?",
    icon: "fa-bolt",
    color: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    chipColor: "#3b82f6",
    options: ["Agitado (correr e gastar energia)", "Super calmo (companheiro de sofá)", "Equilibrado (brinca e descansa)"]
  },
  {
    id: 6,
    title: "Se você tivesse um cachorro agora, qual seria a primeira coisa que você ensinaria para ele?",
    icon: "fa-graduation-cap",
    color: "linear-gradient(135deg, #06b6d4, #10b981)",
    chipColor: "#06b6d4",
    options: ["Fazer as necessidades no lugar certo", "Dar a patinha e sentar", "Não morder móveis", "Reconhecer o próprio nome", "Andar na coleira sem puxar"]
  },
  {
    id: 7,
    title: "Onde o seu cachorro dormiria: na caminha dele no chão, no quintal ou em cima da sua cama?",
    icon: "fa-bed",
    color: "linear-gradient(135deg, #10b981, #84cc16)",
    chipColor: "#10b981",
    options: ["Na caminha fofa dele no chão", "No quintal (área coberta e quentinha)", "Em cima da minha cama comigo!"]
  },
  {
    id: 8,
    title: "Você gostaria de adotar um vira-lata (sem raça definida) ou prefere um de raça pura? Por qual motivo?",
    icon: "fa-shield-dog",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
    chipColor: "#f59e0b",
    options: ["Adotar um vira-lata (amor e resgate)", "Raça pura (já conheço o temperamento)", "Tanto faz, quero o que me escolher!"]
  },
  {
    id: 9,
    title: "Se o seu cachorro pudesse falar com você por apenas um minuto, o que você acha que ele diria?",
    icon: "fa-comment-dots",
    color: "linear-gradient(135deg, #f97316, #ef4444)",
    chipColor: "#f97316",
    options: ["'Eu te amo muito, obrigado por cuidar de mim!'", "'Cadê o meu petisco agora?!'", "'Vamos passear de novo, por favor?'", "'Você é o meu melhor amigo no mundo!'"]
  },
  {
    id: 10,
    title: "Qual é a atividade mais divertida que você gostaria de fazer junto com o seu cãozinho?",
    icon: "fa-baseball",
    color: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    chipColor: "#ec4899",
    options: ["Jogar bolinha ou frisbee no parque", "Fazer trilhas na natureza", "Correr na praia", "Maratonar filmes no sofá agarradinhos", "Viajar de carro junto"]
  }
];

// Estado da aplicação
let currentStep = 0;
let answers = Array(questionsData.length).fill("");
let zoomScale = 1;

// Elementos DOM
const stepCounter = document.getElementById("stepCounter");
const stepPercent = document.getElementById("stepPercent");
const progressBar = document.getElementById("progressBar");
const questionPill = document.getElementById("questionPill");
const questionTitle = document.getElementById("questionTitle");
const questionIcon = document.getElementById("questionIcon");
const chipsContainer = document.getElementById("chipsContainer");
const answerInput = document.getElementById("answerInput");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const questionCard = document.getElementById("questionCard");
const completionCard = document.getElementById("completionCard");
const nodesContainer = document.getElementById("nodesContainer");
const flowchartSvg = document.getElementById("flowchartSvg");
const flowCountBadge = document.getElementById("flowCountBadge");
const btnReset = document.getElementById("btnReset");
const btnZoomIn = document.getElementById("btnZoomIn");
const btnZoomOut = document.getElementById("btnZoomOut");
const btnResetView = document.getElementById("btnResetView");
const btnViewFlow = document.getElementById("btnViewFlow");
const btnDownload = document.getElementById("btnDownload");
const mobileTabs = document.querySelectorAll(".tab-btn");
const formSection = document.getElementById("formSection");
const flowchartSection = document.getElementById("flowchartSection");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderStep();
  renderFlowchart();
  setupEventListeners();
});

// Configura eventos
function setupEventListeners() {
  btnNext.addEventListener("click", handleNext);
  btnPrev.addEventListener("click", handlePrev);
  btnReset.addEventListener("click", resetAll);

  // Zoom
  btnZoomIn.addEventListener("click", () => adjustZoom(0.1));
  btnZoomOut.addEventListener("click", () => adjustZoom(-0.1));
  btnResetView.addEventListener("click", () => {
    zoomScale = 1;
    nodesContainer.style.transform = `scale(1)`;
    updateConnectors();
  });

  // Mobile Tabs
  mobileTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      mobileTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      if (target === "form") {
        formSection.classList.add("active");
        flowchartSection.classList.remove("active");
      } else {
        flowchartSection.classList.add("active");
        formSection.classList.remove("active");
        setTimeout(updateConnectors, 100);
      }
    });
  });

  btnViewFlow.addEventListener("click", () => {
    const flowTab = document.querySelector('[data-tab="flowchart"]');
    if (window.innerWidth <= 900 && flowTab) {
      flowTab.click();
    } else {
      flowchartSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  btnDownload.addEventListener("click", downloadSummary);

  // Redimensionamento
  window.addEventListener("resize", () => {
    updateConnectors();
  });
}

// Renderiza a pergunta atual
function renderStep() {
  if (currentStep >= questionsData.length) {
    showCompletionScreen();
    return;
  }

  showQuestionScreen();
  const q = questionsData[currentStep];

  // Textos e Progresso
  stepCounter.textContent = `Etapa ${q.id} de ${questionsData.length}`;
  const pct = Math.round(((currentStep + 1) / questionsData.length) * 100);
  stepPercent.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;

  questionPill.textContent = `Pergunta ${q.id}`;
  questionTitle.textContent = q.title;
  questionIcon.className = `fa-solid ${q.icon}`;
  questionIcon.style.color = q.chipColor;

  // Carrega resposta existente
  answerInput.value = answers[currentStep] || "";

  // Renderiza opções rápidas (chips)
  chipsContainer.innerHTML = "";
  q.options.forEach(opt => {
    const chip = document.createElement("button");
    chip.className = "chip-btn";
    chip.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span>${opt}</span>`;
    
    if (answers[currentStep] === opt) {
      chip.classList.add("selected");
    }

    chip.addEventListener("click", () => {
      answerInput.value = opt;
      chipsContainer.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
    });

    chipsContainer.appendChild(chip);
  });

  // Botões
  btnPrev.style.visibility = currentStep === 0 ? "hidden" : "visible";
  btnNext.innerHTML = currentStep === questionsData.length - 1 ? `Finalizar <i class="fa-solid fa-check"></i>` : `Próxima <i class="fa-solid fa-arrow-right"></i>`;
}

function handleNext() {
  const textVal = answerInput.value.trim();
  if (!textVal) {
    answerInput.focus();
    answerInput.style.borderColor = "#f43f5e";
    setTimeout(() => {
      answerInput.style.borderColor = "";
    }, 1500);
    return;
  }

  // Salva e avança
  answers[currentStep] = textVal;
  currentStep++;
  
  renderStep();
  renderFlowchart();
}

function handlePrev() {
  if (currentStep > 0) {
    // Salva o que digitou se houver
    if (answerInput.value.trim()) {
      answers[currentStep] = answerInput.value.trim();
    }
    currentStep--;
    renderStep();
    renderFlowchart();
  }
}

function showCompletionScreen() {
  questionCard.style.display = "none";
  completionCard.style.display = "flex";
  stepCounter.textContent = "Concluído!";
  stepPercent.textContent = "100%";
  progressBar.style.width = "100%";
}

function showQuestionScreen() {
  questionCard.style.display = "flex";
  completionCard.style.display = "none";
}

// Renderiza Nós e Conexões do Fluxograma
function renderFlowchart() {
  nodesContainer.innerHTML = "";
  
  const answeredItems = [];
  questionsData.forEach((q, idx) => {
    if (answers[idx]) {
      answeredItems.push({ ...q, answer: answers[idx], index: idx });
    }
  });

  flowCountBadge.textContent = answeredItems.length;

  if (answeredItems.length === 0) {
    nodesContainer.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); padding: 40px 10px;">
        <i class="fa-solid fa-diagram-project" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 12px; display:block;"></i>
        <p>Responda à primeira pergunta para iniciar o fluxograma dinâmico.</p>
      </div>
    `;
    flowchartSvg.innerHTML = "";
    return;
  }

  answeredItems.forEach((item, i) => {
    const node = document.createElement("div");
    node.className = `flow-node ${item.index === currentStep ? 'active-step' : ''}`;
    node.id = `flow-node-${i}`;
    node.innerHTML = `
      <div class="flow-node-icon" style="background: ${item.color};">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div class="flow-node-content">
        <div class="flow-node-step">Nó #${item.id}</div>
        <div class="flow-node-question">${item.title}</div>
        <div class="flow-node-answer">${escapeHtml(item.answer)}</div>
      </div>
    `;

    // Clicar no nó volta para a pergunta
    node.addEventListener("click", () => {
      currentStep = item.index;
      renderStep();
      renderFlowchart();
      if (window.innerWidth <= 900) {
        document.querySelector('[data-tab="form"]').click();
      }
    });

    nodesContainer.appendChild(node);
  });

  // Atualiza as linhas SVG após o layout renderizar
  setTimeout(updateConnectors, 60);
}

// Desenha linhas de conexão animadas entre os nós
function updateConnectors() {
  flowchartSvg.innerHTML = "";
  const nodes = nodesContainer.querySelectorAll(".flow-node");
  if (nodes.length < 2) return;

  const containerRect = nodesContainer.getBoundingClientRect();
  flowchartSvg.setAttribute("width", nodesContainer.parentElement.scrollWidth);
  flowchartSvg.setAttribute("height", nodesContainer.parentElement.scrollHeight);

  for (let i = 0; i < nodes.length - 1; i++) {
    const fromRect = nodes[i].getBoundingClientRect();
    const toRect = nodes[i + 1].getBoundingClientRect();

    const parentRect = nodesContainer.parentElement.getBoundingClientRect();
    const scrollLeft = nodesContainer.parentElement.scrollLeft;
    const scrollTop = nodesContainer.parentElement.scrollTop;

    const x1 = (fromRect.left + fromRect.width / 2) - parentRect.left + scrollLeft;
    const y1 = fromRect.bottom - parentRect.top + scrollTop;

    const x2 = (toRect.left + toRect.width / 2) - parentRect.left + scrollLeft;
    const y2 = toRect.top - parentRect.top + scrollTop;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const deltaY = (y2 - y1) * 0.55;
    const d = `M ${x1} ${y1} C ${x1} ${y1 + deltaY}, ${x2} ${y2 - deltaY}, ${x2} ${y2}`;

    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "url(#lineGradient)");
    path.setAttribute("stroke-width", "3");
    path.classList.add("flow-line");

    flowchartSvg.appendChild(path);
  }

  // Gradiente SVG para as linhas
  ensureSvgDefs();
}

function ensureSvgDefs() {
  let defs = flowchartSvg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
    `;
    flowchartSvg.prepend(defs);
  }
}

// Controle de Zoom
function adjustZoom(delta) {
  zoomScale = Math.min(Math.max(0.6, zoomScale + delta), 1.4);
  nodesContainer.style.transform = `scale(${zoomScale})`;
  setTimeout(updateConnectors, 200);
}

// Recomeçar
function resetAll() {
  if (confirm("Deseja realmente reiniciar todo o fluxograma?")) {
    answers = Array(questionsData.length).fill("");
    currentStep = 0;
    zoomScale = 1;
    nodesContainer.style.transform = "scale(1)";
    renderStep();
    renderFlowchart();
  }
}

// Download de Resumo em TXT
function downloadSummary() {
  let content = "=== FLUXOGRAMA: MEU CACHORRO DOS SONHOS ===\n\n";
  questionsData.forEach((q, i) => {
    content += `Pergunta ${q.id}: ${q.title}\n`;
    content += `Resposta: ${answers[i] || "Não respondida"}\n\n`;
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meu-cachorro-dos-sonhos.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[m]);
}