// Seleciona a mensagem de alerta
const alertMessage = document.getElementById("alertMessage")

// Função para mostrar a mensagem de alerta
function mostrarAlerta() {
    alertMessage.style.display = "block"  // Exibe a mensagem
}

// Função para esconder a mensagem de alerta
function esconderAlerta() {
    alertMessage.style.display = "none"  // Oculta a mensagem
}

// Ativar alerta e LED ao pressionar o botão
alertButton.addEventListener("mousedown", (event) => {
    event.preventDefault()

    if (!alertaAtivo) {
        somAlerta.loop = true
        somAlerta.play()
        alertaAtivo = true
        ligarLed()
        mostrarAlerta()  // Mostra a mensagem de alerta
    }
})

// Desativar alerta e LED ao soltar o botão
alertButton.addEventListener("mouseup", (event) => {
    event.preventDefault()

    if (alertaAtivo) {
        somAlerta.pause()
        somAlerta.currentTime = 0
        alertaAtivo = false
        desligarLed()
        esconderAlerta()  // Esconde a mensagem de alerta
    }
})

// Eventos para dispositivos touch
alertButton.addEventListener("touchstart", (event) => {
    event.preventDefault()

    if (!alertaAtivo) {
        somAlerta.loop = true
        somAlerta.play()
        alertaAtivo = true
        ligarLed()
        mostrarAlerta()  // Mostra a mensagem de alerta
    }
})

alertButton.addEventListener("touchend", (event) => {
    event.preventDefault()

    if (alertaAtivo) {
        somAlerta.pause()
        somAlerta.currentTime = 0
        alertaAtivo = false
        desligarLed()
        esconderAlerta()  // Esconde a mensagem de alerta
    }
})
