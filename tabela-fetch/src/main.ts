import './style.css'





async function carregarDados() {
  try {
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon');
    const dados = await resposta.json();
    console.log(dados);

    const tabela = document.getElementById('corpoT') as HTMLTableElement;
    let linhas = '';

    dados.results.forEach((pokemon: { name: string; url: string }) => {
      linhas += `
        <tr>
          <td>${pokemon.name}</td>
          <td><a href="${pokemon.url}</a></td>
        </tr>
      `;
    });

    tabela.innerHTML = `
      <tr>
        <th>Nome</th>
        <th>Link</th>
      </tr>
      ${linhas}
    `;
  } 

  catch (erro) {
    console.error('Erro ao buscar dados:', erro);
  }
}

carregarDados();


//adicionar function que carrega foto do pokemon, usando a url do pokemon para pegar o id e depois usar a url da imagem do pokemon com o id para mostrar a imagem na tabela.

//adicionar function do btn de proxima pagina e retroceder, validação que a primeira pagina nao da pra retroceder

//a
