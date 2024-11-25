// acessa o objeto 'document' que representa a pagina html

// document.addEventListener("DOMContentLoaded");

// chamada da função 'createUser' para a associação ao evento de envio do fromulário
document
  .getElementById("formulario-registro")
  .addEventListener("submit", createUser);

document.addEventListener("DOMContentLoaded", getAllUsers);
document.addEventListener("DOMContentLoaded", getAllUsersTable);

document.addEventListener("DOMContentLoaded", getAllOrgsTable);

function createUser(event) {
  // adiciona o ouvinte do evento 'submit'
  event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  const name = document.getElementById("nome").value; // capturar os valores dos campos do formulário pelo id
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const data_nascimento = document.getElementById("data").value;

  // requisição http para o endpoint de cadastro de usuário

  fetch("http://10.89.240.14:5000/api/v1/user", {
    // realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",
    headers: {
      // a requisição será em formato JSON
      "Content-Type": "application/json",
    },
    // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, password, email, data_nascimento }),
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

      alert(data.message);
      console.log(data.message);

      // exibe o log no terminal
      console.log("Usuário Cadastrado: " + data.user);

      // limpa os campos do formulario, após o sucesso do cadastro
      document.getElementById("formulario-registro").reset();
    }) // --- fechamento 'data'
    //captura qualquer erro que ocorra durante o processo de requisição/ resposta
    .catch((error) => {
      // exibe alerta no (front) com erro processado
      alert("Erro no cadastro: " + error.message);
      console.error("Erro:", error.message);
    }); // --- fechamento 'catch(error)'
} // --- function createUser

function getAllUsers() {
  fetch("http://10.89.240.14:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = " "; // limpa a lista existente
      data.users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}, Data de Nascimento:${user.data_nascimento}`;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => {
      alert("Erro ao obter Usuários" + error.message);
      console.error("Erro ", error.message);
    });
}

function getAllUsersTable(){
  fetch("http://10.89.240.14:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list-tabela");
      //Limpa a lista antes de adicionar novos itens
      userList.innerHTML = "";

      //Verifica se há usuarios retornados e os readiciona á tabela
      data.users.forEach((usuario) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const tdName = document.createElement("td");
        tdName.textContent = usuario.name;
        tr.appendChild(tdName);

        const tdcpf = document.createElement("td");
        tdcpf.textContent = usuario.cpf;
        tr.appendChild(tdcpf);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = usuario.email;
        tr.appendChild(tdEmail);

        const tdData_nascimento = document.createElement("td");
        tdData_nascimento.textContent = usuario.data_nascimento;
        tr.appendChild(tdData_nascimento);

        //Adiciona a linha à tabela
        userList.appendChild(tr);

      });
    })
    .catch((error) => {
      alert("Error ao obter usuários: " + error.message);
      console.error("Erro: ", error.message);
    });
}
 
function getAllOrgsTable(){
  fetch("http://10.89.240.99:5000/api/v1/organizador/", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const orgList = document.getElementById("org-list-tabela");
      //Limpa a lista antes de adicionar novos itens
      orgList.innerHTML = "";

      //Verifica se há usuarios retornados e os readiciona á tabela
      data.organizadores.forEach((organizador) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const tdNome = document.createElement("td");
        tdNome.textContent = organizador.nome;
        tr.appendChild(tdNome);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = organizador.email;
        tr.appendChild(tdEmail);

        const tdtelefone = document.createElement("td");
        tdtelefone.textContent = organizador.telefone;
        tr.appendChild(tdtelefone);

        //Adiciona a linha à tabela
        orgList.appendChild(tr);

      });
    })
    .catch((error) => {
      alert("Error ao obter organizadores: " + error.message);
      console.error("Erro: ", error.message);
    });
}
