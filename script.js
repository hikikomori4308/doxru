document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value.trim();
    
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let result = 'Номер не найден';

            lines.forEach(line => {
                const parts = line.split(','); // Предполагается, что данные разделены запятой
                if (parts[0].trim() === number) { // Сравнение с первым элементом строки (номер)
                    result = line; // вывод всей строки с данным номером
                }
            });

            document.getElementById('result').textContent = result;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('result').textContent = 'Произошла ошибка';
        });
});
