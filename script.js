document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value.trim();
    const dataType = document.getElementById('dataType').value;
    
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
                const parts = line.split(','); // Разделяем строку по запятой

                // Проверяем, что у нас есть достаточно элементов
                if (parts.length < 6) {
                    console.warn('Недостаточно данных в строке:', line);
                    return; // Пропускаем строку, если она недостаточно длинная
                }

                // Проверяем тип данных в зависимости от выбранной опции
                if ((dataType === 'phone' && parts[0].trim() === number) || 
                    (dataType === 'passport' && parts[1].trim() === number) || 
                    (dataType === 'inn' && parts[2].trim() === number) || 
                    (dataType === 'telegram' && parts[3].trim() === number) || 
                    (dataType === 'vk' && parts[4].trim() === number) || 
                    (dataType === 'email' && parts[5].trim() === number)) {
                    
                    found = true; // Устанавливаем флаг, если данные найдены

                    // Добавляем найденные данные в таблицу
                    output += `<tr>
                        <td>${parts[0].trim()}</td>
                        <td>${parts[1].trim()}</td>
                        <td>${parts[2].trim()}</td>
                        <td>${parts[3].trim()}</td>
                        <td>${parts[4].trim()}</td>
                        <td>${parts[5].trim()}</td>
                    </tr>`;
                }
            });

            output += '</table>';
            document.getElementById('result').innerHTML = found ? output : 'Данные не найдены'; // Показываем таблицу с данными или сообщение
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('result').textContent = 'Произошла ошибка';
        });
});
