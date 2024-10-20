document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const number = document.getElementById('numberInput').value;
    
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let result = 'Номер не найден';

            lines.forEach(line => {
                if (line.includes(number)) {
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
