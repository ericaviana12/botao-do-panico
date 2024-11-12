/**
 * App de Alerta Sonoro e LED
 * @author Erica Viana
 */

// Variáveis de apoio
let alertaAtivo = false  // Estado do alerta sonoro
let stream, track        // Suporte para o controle do LED

// Pré-carregamento de áudio
const somAlerta = new Audio("sound/alarme.mp3")  // Caminho do som de alerta

// Inicialização do LED
async function inicializarLed() {  // Define a função assíncrona para inicializar o LED
    try {  // Tenta executar o código dentro do bloco
        // Solicita acesso à câmera traseira
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }  // Solicita acesso ao vídeo da câmera traseira
        })

        // Obtém o track do vídeo para controlar o LED
        track = stream.getVideoTracks()[0]  // Obtém o primeiro track de vídeo da câmera

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()  // Verifica as capacidades do track de vídeo
        if (!capabilities.torch) {  // Se o dispositivo não suporta lanterna (LED)
            console.log("LED não suportado no dispositivo.")  // Exibe uma mensagem no console
            return  // Interrompe a execução da função
        }
    } catch (error) {  // Caso haja erro
        console.error(`Erro ao inicializar o LED: ${error}`)  // Exibe o erro no console
    }
}

// Função para ativar o LED
async function ligarLed() {  // Define a função assíncrona para ligar o LED
    if (track) {  // Verifica se o track de vídeo foi obtido
        try {  // Tenta executar o código dentro do bloco
            await track.applyConstraints({ advanced: [{ torch: true }] })  // Aplica a configuração de ativar o LED
        } catch (error) {  // Caso haja erro
            console.error(`Erro ao ligar o LED: ${error}`)  // Exibe o erro no console
        }
    }
}

// Função para desativar o LED
async function desligarLed() {  // Define a função assíncrona para desligar o LED
    if (track) {  // Verifica se o track de vídeo foi obtido
        try {  // Tenta executar o código dentro do bloco
            await track.applyConstraints({ advanced: [{ torch: false }] })  // Aplica a configuração de desativar o LED
        } catch (error) {  // Caso haja erro
            console.error(`Erro ao desligar o LED: ${error}`)  // Exibe o erro no console
        }
    }
}

// Controle de eventos do botão
const alertButton = document.getElementById("alertButton")  // Obtém o botão pelo seu id

// Garantir que o som seja carregado corretamente
somAlerta.load()  // Carregar o som antes de qualquer interação

// Ativar alerta e LED ao pressionar o botão
alertButton.addEventListener("mousedown", (event) => {  // Evento ao pressionar o botão com o mouse
    event.preventDefault()  // Ignorar o comportamento padrão do botão

    if (!alertaAtivo) {  // Se o alerta não estiver ativo
        somAlerta.loop = true  // Configura o som para tocar em loop
        somAlerta.play()  // Inicia o som de alerta
        alertaAtivo = true  // Atualiza o estado do alerta para ativo
        ligarLed()  // Ativa o LED
    }
})

// Desativar alerta e LED ao soltar o botão
alertButton.addEventListener("mouseup", (event) => {  // Evento ao soltar o botão com o mouse
    event.preventDefault()  // Ignorar o comportamento padrão

    if (alertaAtivo) {  // Se o alerta estiver ativo
        somAlerta.pause()  // Pausa o som de alerta
        somAlerta.currentTime = 0  // Reinicia o som para o início
        alertaAtivo = false  // Atualiza o estado do alerta para inativo
        desligarLed()  // Desativa o LED
    }
})

// Eventos para dispositivos touch
alertButton.addEventListener("touchstart", (event) => {  // Evento ao tocar no botão (início do toque)
    event.preventDefault()  // Ignorar o comportamento padrão

    if (!alertaAtivo) {  // Se o alerta não estiver ativo
        somAlerta.loop = true  // Configura o som para tocar em loop
        somAlerta.play()  // Inicia o som de alerta
        alertaAtivo = true  // Atualiza o estado do alerta para ativo
        ligarLed()  // Ativa o LED
    }
});

alertButton.addEventListener("touchend", (event) => {  // Evento ao soltar o toque no botão
    event.preventDefault()  // Ignorar o comportamento padrão

    if (alertaAtivo) {  // Se o alerta estiver ativo
        somAlerta.pause()  // Pausa o som de alerta
        somAlerta.currentTime = 0  // Reinicia o som para o início
        alertaAtivo = false  // Atualiza o estado do alerta para inativo
        desligarLed()  // Desativa o LED
    }
})

// Inicializar o LED
inicializarLed()  // Chama a função para inicializar o LED
