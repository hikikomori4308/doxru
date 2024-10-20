document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value.trim();
    const dataType = document.getElementById('dataType').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ''; // Очищаем результат перед новым поиском

    fetch('data.txt')
        .then(response => {
            if (!response.ok) throw new Error('Сеть не ответила');
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            let found = false;
            let output = '<table><tr><th>Номер телефона</th><th>Паспорт</th><th>ИНН</th><th>Telegram ID</th><th>VK ID</th><th>Почта</th></tr>';

            lines.forEach(line => {
                const parts = line.split(',').map(part => part.trim());

                // Проверяем, что у нас есть достаточно элементов
                if (parts.length < 6) {
                    console.warn('Недостаточно данных в строке:', line);
                    return;
                }

                // Проверяем тип данных в зависимости от выбранной опции
                if ((dataType === 'phone' && parts[0] === number) || 
                    (dataType === 'passport' && parts[1] === number) || 
                    (dataType === 'inn' && parts[2] === number) || 
                    (dataType === 'telegram' && parts[3] === number) || 
                    (dataType === 'vk' && parts[4] === number) || 
                    (dataType === 'email' && parts[5] === number)) {
                    found = true; // Устанавливаем флаг, если данные найдены

                    // Добавляем найденные данные в таблицу
                    output += `<tr>
                        <td>${parts[0]}</td>
                        <td>${parts[1]}</td>
                        <td>${parts[2]}</td>
                        <td>${parts[3]}</td>
                        <td>${parts[4]}</td>
                        <td>${parts[5]}</td>
                    </tr>`;
                }
            });

            output += '</table>';
            if (found) {
                resultDiv.innerHTML = output; // Показываем таблицу с данными
            } else {
                resultDiv.textContent = 'Данные не найдены'; // Показать сообщение, если данные не найдены
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            resultDiv.textContent = 'Произошла ошибка';
        });
});
