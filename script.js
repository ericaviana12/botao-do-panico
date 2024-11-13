const alertButton = document.getElementById('alertButton') // Seleciona o botão de alerta (imagem) pelo ID e armazena na constante alertButton // 
const alertMessage = document.getElementById('alertMessage') // Seleciona a mensagem de alerta pelo ID e armazena na constante alertMessage //
const sound = new Audio("sound/alarm.mp3") // Cria um novo objeto de áudio, com o caminho para o arquivo de som, para ser usado como alerta sonoro //

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
