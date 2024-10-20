document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value.trim();
    const dataType = document.getElementById('dataType').value;
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Очищаем таблицу перед новым поиском
    document.getElementById('dataTable').style.display = 'none'; // Скрываем таблицу

    fetch('data.txt')
        .then(response => {
            if (!response.ok) throw new Error('Сеть не ответила');
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            let found = false;

            lines.forEach(line => {
                const parts = line.split(',');

                // Проверяем, что у нас есть достаточно элементов
                if (parts.length < 6) {
                    console.warn('Недостаточно данных в строке:', line);
                    return;
                }

                // Проверяем тип данных в зависимости от выбранной опции
                if ((dataType === 'phone' && parts[0].trim() === number) || 
                    (dataType === 'passport' && parts[1].trim() === number) || 
                    (dataType === 'inn' && parts[2].trim() === number) || 
                    (dataType === 'telegram' && parts[3].trim() === number) || 
                    (dataType === 'vk' && parts[4].trim() === number) || 
                    (dataType === 'email' && parts[5].trim() === number)) {
                    found = true; // Устанавливаем флаг, если данные найдены

                    // Создаем новую строку таблицы
                    const newRow = document.createElement('tr');

                    // Добавляем названия и значения в отдельные ячейки
                    newRow.innerHTML = `
                        <td>${parts[0].trim()}</td>
                        <td>${parts[1].trim()}</td>
                        <td>${parts[2].trim()}</td>
                        <td>${parts[3].trim()}</td>
                        <td>${parts[4].trim()}</td>
                        <td>${parts[5].trim()}</td>
                    `;
                    
                    tableBody.appendChild(newRow); // Добавляем строку в таблицу
                }
            });

            if (found) {
                document.getElementById('dataTable').style.display = 'table'; // Показываем таблицу, если найдены данные
            } else {
                document.getElementById('result').textContent = 'Данные не найдены';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('result').textContent = 'Произошла ошибка';
        });
});
