import './style.css';

interface Pokemon {
  name: string;
  url: string;
  foto?: string; 
  id?: number;
}


let urlProximo: string | null = null;
let urlAnterior: string | null = null;

const botaoProximo = document.getElementById('proximo') as HTMLButtonElement;
const botaoAnterior = document.getElementById('anterior') as HTMLButtonElement;

async function carregarDados(url: string) {
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    urlProximo = dados.next;
    urlAnterior = dados.previous;

    botaoAnterior.disabled = !urlAnterior;
    botaoProximo.disabled = !urlProximo;



    const tabelaCorpo = document.getElementById('corpoT') as HTMLTableSectionElement;

    const listaPromessas = dados.results.map(async (p: Pokemon) => {
      const res = await fetch(p.url);
      const detalhes = await res.json();
      
      return {
        ...p,
        id: detalhes.id,
        foto: detalhes.sprites.front_default
      };
    });

    const pokemonsCompletos = await Promise.all(listaPromessas);

    let linhas = '';
    pokemonsCompletos.forEach(pokemon => {
      linhas += `
        <tr>
          <td>${pokemon.id}</td>
          <td><strong>${pokemon.name.toUpperCase()}</strong></td>
          <td>
            <img src="${pokemon.foto}" alt="${pokemon.name}" width="60">
          </td>
          <td>
            <a href="${pokemon.url}" target="_blank">Link API</a>
          </td>
        </tr>
      `;
    });

    tabelaCorpo.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Miniatura</th>
        <th>Detalhes</th>
      </tr>
      ${linhas}
    `;

  } catch (erro) {
    console.error('Erro na requisição:', erro);
  }
}

botaoAnterior.addEventListener('click', () => {
  if (urlAnterior) { carregarDados(urlAnterior); }
});

botaoProximo.addEventListener('click', () => {
  if (urlProximo) { carregarDados(urlProximo); }
});

carregarDados('https://pokeapi.co/api/v2/pokemon');