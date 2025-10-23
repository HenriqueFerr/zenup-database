const phrasesData = {
  // === Humor (0-10 baixo, 11-20 normal, 21-30 alto) ===
  humor_muito_baixo: [
    "Sua equipe demonstrou um humor abaixo do esperado. Que tal um 'Dia do Descontração' com jogos rápidos ou um café virtual em grupo?",
    "O bem-estar emocional precisa de um impulso. Considere uma pesquisa anônima rápida para entender a causa da baixa de humor.",
    "Pequenos gestos fazem grande diferença. Comece a próxima reunião com 5 minutos de 'piadas leves' ou reconhecimento individual.",
  ],
  humor_normal: [
    "O humor da equipe está estável. Mantenha os canais de comunicação abertos e continue promovendo um ambiente leve.",
    "A satisfação geral parece positiva. Não deixe de reconhecer publicamente o esforço e as pequenas vitórias do time.",
  ],
  // ... (Você pode adicionar 'humor_alto' se o valor exceder o limite superior)

  // === Estresse (0-10 baixo, 11-20 normal, 21-30 alto) ===
  estresse_alto: [
    "Os níveis de estresse estão elevados. Encoraje o uso integral da hora de almoço e bloqueie a agenda para evitar reuniões desnecessárias.",
    "Sinal de alerta: Estresse alto pode levar ao burnout. Ofereça um 'day off' inesperado ou um dia focado em 'Tarefas Leves'.",
    "Sugira uma pausa guiada de 5 minutos de meditação ou respiração profunda antes do início das atividades.",
  ],
  estresse_normal: [
    "Os níveis de estresse estão saudáveis. Continue priorizando o equilíbrio entre vida pessoal e profissional.",
    "A equipe está lidando bem com a carga de trabalho. Reforce a importância das pausas regulares.",
  ],

  // === Energia (0-10 baixa, 11-20 normal, 21-30 alta) ===
  energia_baixa: [
    "A energia da equipe está em declínio. Proponha um 'Desafio de Hidratação' ou um 'Intervalo Ativo' com alongamentos.",
    "Foco na produtividade e não na ocupação. Garanta que as tarefas de alto valor sejam feitas nas horas de pico de energia da equipe.",
    "Mude o cenário! Permita que a equipe mude o local de trabalho por um dia (se possível) para quebrar a rotina.",
  ],
  energia_alta: [
    "A equipe está com alta energia! Use este momento para tacklear projetos desafiadores e mais complexos.",
    "Excelente energia! Garanta que o fluxo de trabalho não tenha gargalos para capitalizar o ritmo atual.",
  ]
};

// ideia de como seria o service para essa feaature


function nivelHumor() {
let humorNivel = 0;
  if (humorNivel > 0 && humorNivel <= 10) {
    const randomPhraseBaixoHumor = Math.random() * phrasesData.humor_baixo;
    return console.log(randomPhraseBaixoHumor);
  } else if (humorNivel > 10 && humorNivel <= 20) {
    const randomPhraseMedioHumor = Math.random() * phrasesData.humor_medio;
    return console.log(randomPhraseMedioHumor);
  } else if (humorNivel > 20 && humorNivel <= 30) {
    const randomPhraseAltoHumor = Math.random() * phrasesData.humor_alto;
    return console.log(randomPhraseAltoHumor);
  } 
}


module.exports = { phrasesData, nivelHumor };
