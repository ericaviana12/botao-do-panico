// Seleciona a imagem que atua como botão
const alertButton = document.getElementById("alertButton") // Obtém o elemento com id "alertButton" para ser usado como botão de alerta

// Seleciona a mensagem de alerta
const alertMessage = document.getElementById("alertMessage") // Obtém o elemento com id "alertMessage" para exibir a mensagem de alerta

// Variáveis de apoio
let alertaAtivo = false // Estado do alerta sonoro e LED, inicialmente falso

// Pré-carregamento de áudio
const somAlerta = new Audio("sound/alarme.mp3") // Cria um objeto de áudio com o som do alarme

// Função para mostrar a mensagem de alerta
function mostrarAlerta() { // Função para exibir a mensagem de alerta
    alertMessage.style.display = "block" // Define o estilo da mensagem para visível
}

// Função para esconder a mensagem de alerta
function esconderAlerta() { // Função para ocultar a mensagem de alerta
    alertMessage.style.display = "none" // Define o estilo da mensagem para oculto
}

// Função para ativar o LED e som
function ativarAlerta() { // Ativa o som e o LED, além de exibir o alerta
    somAlerta.loop = true // Configura o som para repetir
    somAlerta.play() // Inicia o som do alarme
    alertaAtivo = true // Define o estado do alerta como ativo
    ligarLed() // Chama a função para ligar o LED
    mostrarAlerta() // Exibe a mensagem de alerta
}

// Função para desativar o LED e som
function desativarAlerta() { // Desativa o som e o LED, além de ocultar o alerta
    somAlerta.pause() // Pausa o som do alarme
    somAlerta.currentTime = 0 // Reinicia o som para o início
    alertaAtivo = false // Define o estado do alerta como inativo
    desligarLed() // Chama a função para desligar o LED
    esconderAlerta() // Oculta a mensagem de alerta
}

// Ativar alerta e LED ao pressionar a imagem (botão)
alertButton.addEventListener("mousedown", (event) => { // Evento para mouse pressionado no botão de alerta
    event.preventDefault() // Evita o comportamento padrão do evento
    if (!alertaAtivo) ativarAlerta() // Ativa o alerta se ele estiver inativo
})

// Desativar alerta e LED ao soltar a imagem
alertButton.addEventListener("mouseup", (event) => { // Evento para mouse solto no botão de alerta
    event.preventDefault() // Evita o comportamento padrão do evento
    if (alertaAtivo) desativarAlerta() // Desativa o alerta se ele estiver ativo
})

// Eventos para dispositivos touch
alertButton.addEventListener("touchstart", (event) => { // Evento para toque no botão de alerta
    event.preventDefault() // Evita o comportamento padrão do evento
    if (!alertaAtivo) ativarAlerta() // Ativa o alerta se ele estiver inativo
})

alertButton.addEventListener("touchend", (event) => { // Evento para final de toque no botão de alerta
    event.preventDefault() // Evita o comportamento padrão do evento
    if (alertaAtivo) desativarAlerta() // Desativa o alerta se ele estiver ativo
})

// Inicialização do LED
async function inicializarLed() { // Função assíncrona para configurar o LED do dispositivo
    try {
        stream = await navigator.mediaDevices.getUserMedia({ // Solicita acesso à câmera
            video: { facingMode: "environment" } // Usa a câmera traseira (se disponível)
        })
        track = stream.getVideoTracks()[0] // Obtém a faixa de vídeo para controle do LED
        const capabilities = track.getCapabilities() // Obtém as capacidades do dispositivo
        if (!capabilities.torch) { // Verifica se o dispositivo possui suporte ao LED
            console.log("LED não suportado no dispositivo.") // Informa se o LED não é suportado
            return // Sai da função se não houver suporte ao LED
        }
    } catch (error) {
        console.error(`Erro ao inicializar o LED: ${error}`) // Exibe erro caso ocorra ao acessar o LED
    }
}

// Funções para controlar o LED
async function ligarLed() { // Função assíncrona para ligar o LED
    if (track) { // Verifica se a faixa de vídeo está disponível
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] }) // Liga o LED aplicando a configuração
        } catch (error) {
            console.error(`Erro ao ligar o LED: ${error}`) // Exibe erro caso ocorra ao ligar o LED
        }
    }
}

async function desligarLed() { // Função assíncrona para desligar o LED
    if (track) { // Verifica se a faixa de vídeo está disponível
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] }) // Desliga o LED aplicando a configuração
        } catch (error) {
            console.error(`Erro ao desligar o LED: ${error}`) // Exibe erro caso ocorra ao desligar o LED
        }
    }
}

// Inicializar o LED
inicializarLed() // Chama a função para configurar o LED ao carregar a página
