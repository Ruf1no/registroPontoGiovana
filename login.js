document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login bem-sucedido como usuário
                window.location.href = 'banner.html'; // Redireciona para a página de cadastro de usuários
            })
            .catch((error) => {
                console.error('Erro ao fazer login: ', error.message);
                alert('Falha ao entrar: ' + error.message);
            });
    });

    document.getElementById('adminLoginBtn').addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login bem-sucedido como usuário
                window.location.href = 'administracao.html'; // Redireciona para a página de cadastro de usuários
            })
            .catch((error) => {
                console.error('Erro ao fazer login: ', error.message);
                alert('Falha ao entrar: ' + error.message);
            });
    });
});
