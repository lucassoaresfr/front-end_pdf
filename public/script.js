async function loadAPIUrl() {
    try {
        const response = await fetch("http://frontend-pdf:7005/apiUrl");
        const data = await response.json();
        return data.API_URL; 
    } catch (error) {
        console.error('Erro ao carregar a URL da API:', error);
        return null; 
    }
}

// Função para buscar os produtos
async function fetchProducts() {
    const API_URL = await loadAPIUrl(); 

    if (!API_URL) {
        console.error("Não foi possível carregar a URL da API");
        return;
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        renderProdutos(produtos);
    } catch (error) {
        console.error(error);
    }
}

function renderProdutos(produtos) {
    const selectTable = document.getElementById('selectTable');
    const divTable = document.getElementById('div_table');
    
    // Limpar qualquer conteúdo existente antes de renderizar
    divTable.innerHTML = '';
    
    // Verificar se a tabela foi selecionada
    if (selectTable.value !== 'produtos') {
        return;
    }

    // Agrupando produtos por Departamento e Seção
    const produtosAgrupados = {};
    produtos.forEach((produto) => {
        const depto = produto.DEPTO;
        const secao = produto.SECAO;
        
        if (!produtosAgrupados[depto]) {
            produtosAgrupados[depto] = {};
        }
        if (!produtosAgrupados[depto][secao]) {
            produtosAgrupados[depto][secao] = [];
        }

        produtosAgrupados[depto][secao].push(produto);
    });

    // Laço para renderizar os produtos agrupados
    for (const depto in produtosAgrupados) {
        for (const secao in produtosAgrupados[depto]) {
            const secaoContainer = document.createElement('div');
            secaoContainer.classList.add('secao-container'); // Adiciona a classe para controlar a quebra de página
            
            // Criando a tabela de produtos
            const table = document.createElement('table');
            
            // Criando o cabeçalho da tabela que será repetido em cada página
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th colspan="4" class="header-cell">
                        <img src="http://frontend-pdf:7005/img/1logo.bmp" alt="Imagem do Departamento: ${depto}" width="100" height="50">
                        <h2>Departamento: ${depto}</h2>
                        <h3>Seção: ${secao}</h3>
                    </th>
                </tr>
                <tr>
                    <th>Produto</th>
                    <th>Embalagem</th>
                    <th>Unidade</th>
                </tr>
            `;
            table.appendChild(thead);
            
            // Criando o corpo da tabela
            const tbody = document.createElement('tbody');
            const produtosSecao = produtosAgrupados[depto][secao];
            
            produtosSecao.forEach((produto) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.PRODUTO}</td>
                    <td>${produto.EMBALAGEM}</td>
                    <td>${produto.UNIDADE}</td>
                    <td id="td_rca"></td>
                `;
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            
            // Adiciona a tabela à seção
            secaoContainer.appendChild(table);
            divTable.appendChild(secaoContainer);
        }
    }
}

fetchProducts();

// Evento para o botão de imprimir
document.getElementById('btnPrint').addEventListener('click', function () {
    const selectTable = document.getElementById('selectTable');

    if (selectTable.value === 'produtos') {
        window.print();
    } else {
        alert('Por favor, selecione uma tabela para imprimir.');
    }
});

// Evento para mudar a tabela exibida
document.getElementById('selectTable').addEventListener('change', function () {
    fetchProducts(); // Chama novamente para renderizar a tabela conforme a seleção
});
