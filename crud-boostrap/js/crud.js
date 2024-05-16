document.addEventListener('DOMContentLoaded', function() {
    let items = [ { modelo: 'Acer Nitro', tipo: 'Notebook', marca: 'Acer', quantidade: 10, diferencas: ['Full HD'], condicao: 'Novo' },
    { modelo: 'S23 Ultra', tipo: 'Smartphone', marca: 'Samsung', quantidade: 5, diferencas: ['Full HD'], condicao: 'Novo' } ]; // Array para armazenar os itens

    // Função para renderizar os itens na tabela
    function renderItems() {
        const itemsTableBody = document.getElementById('itemsTable');
        itemsTableBody.innerHTML = '';
        items.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${item.modelo}</td>
                    <td>${item.tipo}</td>
                    <td>${item.marca}</td>
                    <td>${item.quantidade}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editItem(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Deletar</button>
                    </td>
                </tr>
            `;
            itemsTableBody.innerHTML += row;
        });
    }

    window.editItem = function(index) {
        const item = items[index];
        document.getElementById('modelo').value = item.modelo;
        document.getElementById('tipo').value = item.tipo;
        document.getElementById('marca').value = item.marca;
        document.getElementById('quantidade').value = item.quantidade;
        document.querySelectorAll('input[name="diferencias"]').forEach(checkbox => {
            checkbox.checked = item.diferencas.includes(checkbox.value); 
        });
        document.querySelectorAll('input[name="condicao"]').forEach(radio => {
            radio.checked = radio.value === item.condicao; 
        });
        document.getElementById('editIndex').value = index;

        var myModal = new bootstrap.Modal(document.getElementById('itemModal'), {
            keyboard: false
        });
        myModal.show();
    };

    window.deleteItem = function(index) {
        const item = items[index];
        const message = `Tem certeza que deseja excluir o ${item.tipo} ${item.modelo} da marca ${item.marca}?`;
        document.getElementById('confirmMessage').innerText = message;
        
        var confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'), {
            keyboard: false
        });
        confirmModal.show();
    
        document.getElementById('confirmDelete').onclick = function() {
            items.splice(index, 1);
            renderItems();
            confirmModal.hide();
        };
    };

    window.saveItem = function() {
        const checkboxes = document.querySelectorAll('input[name="diferencias"]:checked');
        const diferencas = [];
        checkboxes.forEach(checkbox => {
            diferencas.push(checkbox.value);
        });
      
        const condicaoRadio = document.querySelector('input[name="condicao"]:checked');
        const condicao = condicaoRadio ? condicaoRadio.value : '';
        const modelo = document.getElementById('modelo').value;
        const tipo = document.getElementById('tipo').value;
        const marca = document.getElementById('marca').value;
        const quantidade = document.getElementById('quantidade').value;
        const index = document.getElementById('editIndex').value;

        const itemData = {
            modelo, tipo, marca, quantidade, diferencas, condicao
        };

        if (!itemData.modelo || !itemData.tipo || !itemData.marca || !itemData.quantidade || !itemData.diferencas || !itemData.condicao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (diferencas.length === 0) {
            alert('Por favor, selecione pelo menos uma diferença.');
            return false;
          }


        if (index) {
            items[index] = itemData;
        } else {
            items.push(itemData);
        }

        var myModalEl = document.getElementById('itemModal');
        var myModal = bootstrap.Modal.getInstance(myModalEl);
        myModal.hide();

        renderItems();
    };

    document.getElementById('btnNew').addEventListener('click', function() {
        document.getElementById('itemModal').querySelector('.modal-title').textContent = 'Adicionar Novo Item';
        document.getElementById('itemForm').reset();
        document.getElementById('editIndex').value = '';

        var myModal = new bootstrap.Modal(document.getElementById('itemModal'), {
            keyboard: false
        });
        myModal.show();
    });

    renderItems();
});