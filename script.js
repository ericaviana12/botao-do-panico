/**
 * Desenvolvimento de um app de botão do pânico
 * @author Erica Viana
 */

const alertButton = document.getElementById('alertButton') // Seleciona o botão de alerta (imagem) pelo ID e armazena na constante alertButton //
const alertMessage = document.getElementById('alertMessage') // Seleciona a mensagem de alerta pelo ID e armazena na constante alertMessage //
const sound = new Audio("sound/alarme.mp3") // Cria um novo objeto de áudio, com o caminho para o arquivo de som, para ser usado como alerta sonoro //
let alertaAtivo = false // Define o estado do alerta sonoro e LED, inicialmente falso //

function toggleAlert(isActive) { // Declara uma função chamada toggleAlert que recebe um parâmetro isActive para ativar/desativar o alerta //
    alertMessage.style.display = isActive ? 'block' : 'none' // Define a exibição da mensagem de alerta como "block" se isActive for true e "none" caso contrário //
    isActive ? sound.play() : sound.pause() // Toca o som se isActive for true, ou pausa o som caso contrário //
}

alertButton.addEventListener('mousedown', () => toggleAlert(true)) // Adiciona um ouvinte de evento para o botão, ativando o alerta no pressionamento do mouse //
alertButton.addEventListener('mouseup', () => toggleAlert(false)) // Adiciona um ouvinte de evento para o botão, desativando o alerta ao soltar o mouse //
alertButton.addEventListener('touchstart', (event) => { // Adiciona um ouvinte de evento para ativar o alerta ao pressionar a tela (touchstart) //
    event.preventDefault() // Previne o comportamento padrão para evitar ações indesejadas no toque //
    toggleAlert(true) // Chama a função toggleAlert passando true para ativar o alerta //
})
alertButton.addEventListener('touchend', (event) => { // Adiciona um ouvinte de evento para desativar o alerta ao soltar a tela (touchend) //
    event.preventDefault() // Previne o comportamento padrão para evitar ações indesejadas no toque //
    toggleAlert(false) // Chama a função toggleAlert passando false para desativar o alerta //
})

// Inicialização do LED
async function inicializarLed() { // Função assíncrona para configurar o LED do dispositivo //
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ // Solicita acesso à câmera //
            video: { facingMode: "environment" } // Usa a câmera traseira (se disponível) //
        })
        track = stream.getVideoTracks()[0] // Obtém a faixa de vídeo para controle do LED //
        const capabilities = track.getCapabilities() // Obtém as capacidades do dispositivo //
        if (!capabilities.torch) { // Verifica se o dispositivo possui suporte ao LED //
            console.log("LED não suportado no dispositivo.") // Informa se o LED não é suportado //
            document.getElementById('cameraPermissionMessage').style.display = 'none' // Esconde a mensagem de permissão para câmera //
            return // Sai da função se não houver suporte ao LED //
        }
    } catch (error) {
        console.error(`Erro ao inicializar o LED: ${error}`) // Exibe erro caso ocorra ao acessar o LED //
    }
}

// Funções para controlar o LED
async function ligarLed() { // Função assíncrona para ligar o LED //
    if (track) { // Verifica se a faixa de vídeo está disponível //
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] }) // Tenta ativar o LED //
        } catch (error) {
            console.error(`Erro ao ligar o LED: ${error}`) // Exibe erro ao tentar ligar o LED //
        }
    }
}

async function desligarLed() { // Função assíncrona para desligar o LED //
    if (track) { // Verifica se a faixa de vídeo está disponível //
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] }) // Tenta desativar o LED //
        } catch (error) {
            console.error(`Erro ao desligar o LED: ${error}`) // Exibe erro ao tentar desligar o LED //
        }
    }
}

inicializarLed() // Chama a função para inicializar o LED no início // 
