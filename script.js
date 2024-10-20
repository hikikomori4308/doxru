document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value.trim();
    const dataType = document.getElementById('dataType').value;
    
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let result = 'Данные не найдены';

            lines.forEach(line => {
                const parts = line.split(','); // Предполагается, что данные разделены запятой
                
                // Проверяем тип данных в зависимости от выбранной опции
                if ((dataType === 'phone' && parts[0].trim() === number) || 
                    (dataType === 'passport' && parts[1].trim() === number) || 
                    (dataType === 'inn' && parts[2].trim() === number) || 
                    (dataType === 'telegram' && parts[3].trim() === number) || 
                    (dataType === 'vk' && parts[4].trim() === number) || 
                    (dataType === 'email' && parts[5].trim() === number)) {
                    result = line; // вывод всей строки с данными
                }
            });

            document.getElementById('result').textContent = result;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('result').textContent = 'Произошла ошибка';
        });
});
