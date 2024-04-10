document.addEventListener('DOMContentLoaded', function() {
    const items = [
      { modelo: 'Notebook', marca: 'Acer', quantidade: 10 },
      { modelo: 'Smartphone', marca: 'Samsung', quantidade: 5 }
    ];

    const itemsTableBody = document.querySelector('#itemsTable tbody');

    function renderItems() {
        itemsTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos itens
        items.forEach((item, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.modelo}</td>
            <td>${item.marca}</td>
            <td>${item.quantidade}</td>
            <td>
              <button onclick="editItem(${index})">Editar</button>
              <button onclick="deleteItem(${index})">Deletar</button>
            </td>
          `;
          itemsTableBody.appendChild(row);
        });
      }

      renderItems();

      window.editItem = function(index) {
        // Função para editar o item
        console.log('Editando item', index);
      };
    
      window.deleteItem = function(index) {
        // Função para deletar o item
        console.log('Deletando item', index);
      };
});