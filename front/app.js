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
        fetch("http://localhost:5000/api/v1/user",{
            //Realiza uma chamada http para o servidor (a rota definida)
            method: "POST",
            headers:{
                //A requisição será em formato json
                "Content-Type":application/json,
            }, 
            //Transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
            body: JSON.stringify({name, cpf, email, password}),
        })
    });
