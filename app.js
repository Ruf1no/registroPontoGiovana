// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTIUxIvwqo6AGqWwfzHOhTOu01fMtO5F0",
    authDomain: "giovanateste-f854b.firebaseapp.com",
    databaseURL: " https://giovanateste-f854b-default-rtdb.firebaseio.com/",
    projectId: "giovanateste-f854b",
    storageBucket: "gs://giovanateste-f854b.appspot.com",
    messagingSenderId: "1098374894808",
    appId: "1:1098374894808:web:3627cfdfa377959cbcb3ad"
  };
  


   firebase.initializeApp(firebaseConfig); // Inicialize o Firebase
   const database = firebase.database(); // Inicialize o banco de dados
   const storage = firebase.storage(); // Inicialize o storage


/////////////////////////////////////////////////////////////////////

//APP DO FUNCIONARIO

function enviarDadosParaFirebaseFuncionario() {
    const nome = document.getElementById('nome').value;
    const area = document.getElementById('area').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de imagem

    if (imagem) {
        const storageRef = storage.ref('imagens/' + imagem.name);
        storageRef.put(imagem).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    nome: nome,
                    area: area,
                    endereco: endereco,
                    telefone: telefone,
                    imagemURL: downloadURL // Salva a URL da imagem
                };
                database.ref('funcionarios').push(dados)
                .then(() => {
                    alert('Dados do usúario enviados com sucesso!, por favor, agora cadastre seu registro de ponto');
                    document.getElementById('nome').value = '';
                    document.getElementById('area').value = '';
                    document.getElementById('endereco').value = '';
                    document.getElementById('telefone').value = '';
                    document.getElementById('imagem').value = '';
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados para o Realtime Database: ', error);
                    alert('Erro ao enviar os dados. Por favor, tente novamente.');
                });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao enviar a imagem. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}

    


                            //APP DO PONTO DE REGISTRO
function enviarDadosParaFirebasePonto() {
    const hora = document.getElementById('hora').value;
    const data = document.getElementById('data').value;
    const localizacao = document.getElementById('localizacao').value;
    const imagemPonto = document.getElementById('imagemPonto').files[0]; // Obtém o arquivo de imagem

    if (imagemPonto) {
        const storageRef = storage.ref('imagens/' + imagemPonto.name);
        storageRef.put(imagemPonto).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    hora: hora,
                    data: data,
                    localizacao: localizacao,
                    imagemURL2: downloadURL // Salva a URL da imagem
                };
                database.ref('registroPontos').push(dados)
                .then(() => {
                    alert('Registro enviado com sucesso!');
                    document.getElementById('hora').value = '';
                    document.getElementById('data').value = '';
                    document.getElementById('localizacao').value = '';
                    document.getElementById('imagemPonto').value = '';
                })
                .catch(error => {
                    console.error('Erro ao enviar o registro para o Realtime Database: ', error);
                    alert('Erro ao enviar os dados. Por favor, tente novamente.');
                });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao enviar a imagem. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}


// Função para consultar registros de ponto do usuário logado por data
function consultarPontoAnterior() {
    const data = document.getElementById('dataConsulta').value.trim();
    const registroPontoRef = database.ref('registroPontos');
    registroPontoRef.orderByChild('data').equalTo(data).once('value', snapshot => {
        const data = snapshot.val();
        const lista = document.getElementById('listaPontos');
        lista.innerHTML = ''; // Limpar lista anterior

        if (data) {
            Object.keys(data).forEach(key => {
                const registroPonto = data[key];
                const item = document.createElement('li');
                item.innerHTML = `Hora: ${registroPonto.hora}, Data: ${registroPonto.data}, Localização: 
                ${registroPonto.localizacao}, Imagem: <p><img src="${registroPonto.imagemURL2}" alt="Imagem do ponto" 
                style="width:100px; height:auto;">`;
                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '<li>Nenhum Registro de ponto encontrado com essa data.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar registro de pontos: ', error);
    });
}






//ADMINISTRAÇÃO do usuario
function consultarPontoPorNome() {
    const nome = document.getElementById('nomeConsulta').value.trim();
    const funcionariosRef = database.ref('funcionarios');
    funcionariosRef.orderByChild('nome').equalTo(nome).once('value', snapshot => {
    const data = snapshot.val();
    const lista = document.getElementById('listaFuncionarios');
    lista.innerHTML = ''; // Limpar lista anterior

    if (data) {
    Object.keys(data).forEach(key => {
    const funcionario = data[key];
    const item = document.createElement('li');
    item.innerHTML = `<p>Nome: ${funcionario.nome}, <p>Aréa em que trabalha: ${funcionario.area}, <p>Endereço: 
   ${funcionario.endereco}, <p>Telefone: ${funcionario.telefone}", Imagem: <p><img src="${funcionario.imagemURL}" alt="Imagem do funcionario" 
   style="width:100px; height:auto;">`;
    lista.appendChild(item);
    });
    } else {
    lista.innerHTML = '<li>Nenhum funcionario encontrado com esse nome.</li>';
    }
    }).catch(error => {
    console.error('Erro ao buscar funcionarios: ', error);
    });
   }


   function mostrarTodosFuncionarios() {
    const funcionariosRef = database.ref('funcionarios');
    funcionariosRef.once('value', snapshot => {
        const data = snapshot.val();
        const lista = document.getElementById('listaFuncionarios');
        lista.innerHTML = ''; // Limpar lista anterior

        if (data) {
            Object.keys(data).forEach(key => {
                const funcionario = data[key];
                const item = document.createElement('li');
                item.innerHTML = `<p>Nome: ${funcionario.nome}, <p>Área em que trabalha: ${funcionario.area}, <p>Endereço: 
                ${funcionario.endereco}, <p>Telefone: ${funcionario.telefone}", Imagem: <p><img src="${funcionario.imagemURL}" alt="Imagem do funcionário" 
                style="width:100px; height:auto;">`;
                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '<li>Nenhum funcionário cadastrado.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar funcionários: ', error);
    });
}





//ADMINISTRAÇÃO do registro de ponto
function consultarPontoPorData() {
    const data = document.getElementById('dataConsulta').value.trim();
    const registroPontoRef = database.ref('registroPontos');
    registroPontoRef.orderByChild('data').equalTo(data).once('value', snapshot => {
    const data = snapshot.val();
    const lista = document.getElementById('listaPontos');
    lista.innerHTML = ''; // Limpar lista anterior

    if (data) {
    Object.keys(data).forEach(key => {
    const registroPonto = data[key];
    const item = document.createElement('li');
    item.innerHTML = `Hora: ${registroPonto.hora}, Data: ${registroPonto.data}, Localização: 
   ${registroPonto.localizacao}, Imagem: <p><img src="${registroPonto.imagemURL2}" alt="Imagem do ponto" 
   style="width:100px; height:auto;">`;
    lista.appendChild(item);
    });
    } else {
    lista.innerHTML = '<li>Nenhum Registro de ponto encontrado com esse nome.</li>';
    }
    }).catch(error => {
    console.error('Erro ao buscar registro de pontos: ', error);
    });
   }

   function mostrarTodosRegistros() {
    const registroPontoRef = database.ref('registroPontos');
    registroPontoRef.once('value', snapshot => {
        const data = snapshot.val();
        const lista = document.getElementById('listaPontos');
        lista.innerHTML = ''; // Limpar lista anterior

        if (data) {
            Object.keys(data).forEach(key => {
                const registroPonto = data[key];
                const item = document.createElement('li');
                item.innerHTML = `Hora: ${registroPonto.hora}, Data: ${registroPonto.data}, Localização: 
                ${registroPonto.localizacao}, Imagem: <p><img src="${registroPonto.imagemURL2}" alt="Imagem do ponto" 
                style="width:100px; height:auto;">`;
                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '<li>Nenhum registro de ponto cadastrado.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar registros de ponto: ', error);
    });
}
