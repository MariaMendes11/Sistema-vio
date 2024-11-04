//Acessa o objeto "documento" que representa a página html

const { application } = require("express");

//Seleciona o elemento com o id indicado do formulário
document
    .getElementById("formulario-registro")
    
    //Adiciona o aouvinte de evento(submmit) para capturar o envio do formulario
    .addEventListener("submmit", function
    (event){
        //Previne o comportamento padrão no formulário, ou seja, impede que ele seja enviadoe recarregue a página
        event.preventDefault();

        //Captura os valores dos campos do formulario
        const name = document.getElementById("name");
        const cpf = document.getElementById("cpf");
        const email = document.getElementById("email");
        const password = documnet.getElementById("password");

        //Requisição HTTP para o endpoint de cadastro de usuário
        fetch("http://10.89.240.3:5000/api/v1/user",{
            //Realiza uma chamada http para o servidor (a rota definida)
            method: "POST",
            headers:{
                //A requisição será em formato json
                "Content-Type":application/json,
            }, 
            //Transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
            body: JSON.stringify({name, cpf, email, password}),
         })
         .then((response) => {
            // tratamento da resposta do servidor / api
            if (response.ok) {
              // verifica se a resposta foi bem-sucedida (status: 20*)
              return response.json();
            } // --- fechamento 'response.ok'
            // convertendo o erro em formato JSON
            return response.json().then((err) => {
              // mensagem retornada do servidor, acessa pela chave 'error'
              throw new Error(err.error);
            }); // --- fechamento 'response error'
          }) // --- fechamento 'response'
          .then((data) => {
            // executa a resposta de sucesso  - retorna ao usuario final
            // exibe alerta com o nome do usuario com o nome que acabou de ser cadastrado (front)
            // alert("Usuário cadastrado com sucesso: " + data.user.name);
    
            alert(data.message);
    
            // alert("Usuário Cadastrado: " + data.user);
    
            // exibe o log no terminal
            console.log("Usuário Cadastrado: " + data.user);
    
            // limpa os campos do formulario, após o sucesso do cadastro
            document.getElementById("formulario-registro").reset()
          }) // --- fechamento 'data'
          //captura qualquer erro que ocorra durante o processo de requisição/ resposta
          .catch((error) => {
            // exibe alerta no (front) com erro processado
            alert("Erro no cadastro: " + error.message);
            console.error("Erro:", error.message);
          }); // --- fechamento 'catch(error)'
      });
