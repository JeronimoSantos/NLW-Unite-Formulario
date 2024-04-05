let participantes = [
    {
        nome: "Jerônimo Santos",
        email: "jeronimosantos@gmail.com",
        dataInscricao: new Date(2024, 3, 13, 19, 30),
        dataCheckIn: new Date(2024, 3, 20, 15, 15),
    },
    {
        nome: "Fernando Santos Rodrigues",
        email: "fernandorodrigues@gmail.com",
        dataInscricao: new Date(2024, 7, 19, 17, 38),
        dataCheckIn: null,
    },
    {
        nome: "Zelia de Jesus Santos",
        email: "zeliadejesussantos@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 12, 10),
        dataCheckIn: new Date(2024, 2, 12, 9, 20),
    },
    {
        nome: "Leandro de Jesus Santos",
        email: "leandrodejesussantos@gmail.com",
        dataInscricao: new Date(2024, 6, 8, 14, 45),
        dataCheckIn: new Date(2024, 6, 15, 11, 55),
    },
    {
        nome: "Jhuli Santos",
        email: "jhulisantos@gmail.com",
        dataInscricao: new Date(2024, 4, 21, 10, 20),
        dataCheckIn: null,
    },
    {
        nome: "Mayk Brito",
        email: "maykbrito@gmail.com",
        dataInscricao: new Date(2024, 8, 17, 16, 55),
        dataCheckIn: new Date(2024, 9, 1, 14, 5),
    },
    {
        nome: "Livia Costa",
        email: "liviacosta@gmail.com",
        dataInscricao: new Date(2024, 1, 9, 9, 40),
        dataCheckIn: new Date(2024, 1, 16, 7, 50),
    },
    {
        nome: "João Pedro Lisboa",
        email: "joaopedrolisboa@gmail.com",
        dataInscricao: new Date(2024, 10, 12, 21, 15),
        dataCheckIn: new Date(2024, 10, 19, 19, 25),
    },
    {
        nome: "Neymar Jr",
        email: "neymarjr@gmail.com",
        dataInscricao: new Date(2024, 11, 3, 8, 30),
        dataCheckIn: new Date(2024, 11, 10, 6, 40),
    },
    {
        nome: "Kayky Aguiar",
        email: "kaykyaguiar@gmail.com",
        dataInscricao: new Date(2024, 9, 28, 11, 20),
        dataCheckIn: null,
    },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button> 
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
 
 const participante = {
  nome: dadosDoFormulario.get('nome'),
  email: dadosDoFormulario.get('email'),
  dataInscricao: new Date(),
  dataCheckIn: null
 }

 //verificar se o paticipante já apareceu
 const participanteExiste = participantes.find(
 (p) => p.email == participante.email
)

if(participanteExiste) {
  alert('Email já cadastrado!')
  return
}
 
 participantes = [participante, ...participantes]
 atualizarLista(participantes)

 // limpar o formulario
 event.target.querySelector('[name="nome"]').value = ""
 event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que quer fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  
  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  // atualizar o check-in do paticipante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}