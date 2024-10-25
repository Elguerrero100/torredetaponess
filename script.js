document.addEventListener('DOMContentLoaded', () => {
    const tower = document.getElementById('tower');
    const addButton = document.getElementById('addButton');
    const resetButton = document.getElementById('resetButton');
    const resetRecordButton = document.getElementById('resetRecordButton'); // Agregamos el boton de reinicio de record
    const passwordInput = document.getElementById('passwordInput'); // Agregamos el campo de entrada de contrasena
    const countDisplay = document.getElementById('countDisplay');
    const recordDisplay = document.getElementById('recordDisplay');
    const gamesPlayedDisplay = document.getElementById('gamesPlayedDisplay');

    let count = 0;
    let highestRecord = 0;
    let gamesPlayed = 0;
    let recordMessageTimeout = null;

    addButton.addEventListener('click', () => {
        const tapon = document.createElement('div');
        tapon.className = 'tapon';
        tower.prepend(tapon); // Agrega el tapon al principio de la torre
        count++;
        countDisplay.textContent = `${count} tapones`;

        if (count > highestRecord) {
            highestRecord = count;
            renderRecord();
            showMessage('Has superado tu record!', 'green');
        }
    });

    resetButton.addEventListener('click', () => {
        tower.innerHTML = '';
        count = 0;
        countDisplay.textContent = `${count} tapones`;
        gamesPlayed++;
        gamesPlayedDisplay.textContent = `Partidas jugadas: ${gamesPlayed}`;
        clearTimeout(recordMessageTimeout);
        recordMessageTimeout = null;
        recordDisplay.textContent = `Record: ${highestRecord} tapones`;
        passwordInput.style.display = 'none'; // Ocultar campo de contrasena al reiniciar el juego
    });

    resetRecordButton.addEventListener('click', () => {
        passwordInput.style.display = 'block'; // Mostrar campo de contrasena al reiniciar el record
        passwordInput.focus(); // Dar foco al campo de contrasena
    });

    passwordInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) { // Verificar si se presiono la tecla Enter
            const password = passwordInput.value; // Obtenemos el valor ingresado en el campo de contrasena
            if (password === '1234') { // Comparamos la contrasena ingresada con la contrasena requerida
                highestRecord = 0; // Reiniciamos el record
                renderRecord(); // Actualizamos el record mostrado en pantalla
                passwordInput.value = ''; // Limpiamos el campo de contrasena
                showMessage('Record reiniciado exitosamente.', 'blue');
                passwordInput.style.display = 'none'; // Ocultar campo de contrasena despues de reiniciar el record
            } else if (password === '0000') { // Si la contrasena es '0000', establece el record en 50000
                highestRecord = 50000;
                renderRecord();
                showMessage('Record establecido en 50000.', 'blue');
                passwordInput.style.display = 'none';
            } else {
                showMessage('Contrasena incorrecta.', 'red'); // Mostramos un mensaje de contrasena incorrecta
            }
        }
    });

    function renderRecord() {
        recordDisplay.textContent = `Record: ${highestRecord} tapones`;
    }

    function showMessage(message, color) {
        recordDisplay.textContent = message;
        recordDisplay.style.color = color;
        recordMessageTimeout = setTimeout(() => {
            recordDisplay.textContent = `Record: ${highestRecord} tapones`;
            recordDisplay.style.color = 'black';
            recordMessageTimeout = null;
        }, 2000);
    }
});
