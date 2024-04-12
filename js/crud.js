document.addEventListener('DOMContentLoaded', function() {
    let items = [
      { modelo: 'Acer Nitro', tipo: 'Notebook', marca: 'Acer', quantidade: 10, diferencas: ['Full HD'], condicao: 'Novo' },
      { modelo: 'S23 Ultra', tipo: 'Smartphone', marca: 'Samsung', quantidade: 5, diferencas: ['Full HD'], condicao: 'Novo' }
    ];

    const itemsTableBody = document.querySelector('#itemsTable tbody');
    const btnNew = document.getElementById('btnNew');
    const itemModal = document.getElementById('itemModal');
    const tipoInput = document.getElementById('tipo');
    const modeloInput = document.getElementById('modelo');
    const marcaInput = document.getElementById('marca');
    const quantidadeInput = document.getElementById('quantidade');
    const editIndexInput = document.getElementById('editIndex');

    function renderItems() {
        itemsTableBody.innerHTML = ''; 
        items.forEach((item, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.modelo}</td>
            <td>${item.tipo}</td>
            <td>${item.marca}</td>
            <td>${item.quantidade}</td>
            <td style="display: flex;">
              <button class="action-btn" onclick="editItem(${index})">Editar</button>
              <button class="action-btn" onclick="deleteItem(${index})">Deletar</button>
            </td>
          `;
          itemsTableBody.appendChild(row);
        });
    }

    window.editItem = function(index) {
        document.getElementById('modalTitle').innerText = 'Editar Item';
        const item = items[index];

        tipoInput.value = item.tipo;
        modeloInput.value = item.modelo;
        marcaInput.value = item.marca;
        quantidadeInput.value = item.quantidade;
        

        document.querySelectorAll('input[name="diferencias"]').forEach(checkbox => {
          checkbox.checked = item.diferencas.includes(checkbox.value); 
      });
  

      document.querySelectorAll('input[name="condicao"]').forEach(radio => {
          radio.checked = radio.value === item.condicao; 
      });

        editIndexInput.value = index;
        itemModal.style.display = 'block';
    };

    window.deleteItem = function(index) {
      var item = items[index];
      var message = `Tem certeza que deseja excluir o ${item.tipo} ${item.modelo} da marca ${item.marca}?`;
      if(confirm(message)) {
        items.splice(index, 1);
        renderItems();
      } 
    };

    window.saveItem = function() {
      const diferencas = [];
        document.querySelectorAll('input[name="diferencias"]:checked').forEach(checkbox => {
          diferencas.push(checkbox.value);
        });
        const condicaoRadio = document.querySelector('input[name="condicao"]:checked');
        const condicao = condicaoRadio ? condicaoRadio.value : '';
    
        const itemData = {
          modelo: modeloInput.value,
          tipo: tipoInput.value,
          marca: marcaInput.value,
          quantidade: quantidadeInput.value,
          diferencas: diferencas,
          condicao: condicao
        };

        if (!itemData.modelo || !itemData.tipo || !itemData.marca || !itemData.quantidade || !itemData.diferencas || !itemData.condicao) {
            alert('Por favor, preencha todos os campos.');
            return;
        } 
        const editIndex = editIndexInput.value;
        if (editIndex) {
          items[editIndex] = itemData;
        } else {
          items.push(itemData);
        }
        closeModal();
        renderItems();
    };

    window.showModal = function() {
        document.getElementById('itemModal').style.display = 'flex'; 
    };
    
    window.closeModal = function() {
        document.getElementById('itemModal').style.display = 'none'; 
        document.getElementById('modelo').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('editIndex').value = '';

        document.querySelectorAll('input[name="diferencias"]').forEach(checkbox => {
          checkbox.checked = false;
      });
      document.querySelectorAll('input[name="condicao"]').forEach(radio => {
          radio.checked = false;
      });
    };

    btnNew.addEventListener('click', function() {
        document.getElementById('modalTitle').innerText = 'Novo Item';
        itemModal.style.display = 'block';
    });

    renderItems();
});


function clearForm() {
    document.getElementById('modelo').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('quantidade').value = '';

    document.querySelectorAll('input[name="diferencias"]').forEach(checkbox => {
      checkbox.checked = false;
  });
  document.querySelectorAll('input[name="condicao"]').forEach(radio => {
      radio.checked = false;
    });
}