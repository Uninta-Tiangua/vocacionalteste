let currentQuestion = 1;
let answersCount = [0, 0, 0, 0];

function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function openFirstQuestion() {
    showNextQuestion();
    closePopup();
}
function startTest() {
    closePopup();
    showNextQuestion();
}

function showNextQuestion() {
    const selectedOption = document.querySelector(`#question${currentQuestion} input[name=q${currentQuestion}]:checked`);
    if (selectedOption) {
        const answerValue = parseInt(selectedOption.value);
        answersCount[answerValue - 1]++;
    }

    currentQuestion++;
    const currentQuestionDiv = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionDiv) {
        document.querySelector(`#question${currentQuestion - 1}`).style.display = 'none';
        currentQuestionDiv.style.display = 'block';
    } else {
        calculateResult();
    }
}

function calculateResult() {
    const totalAnswers = answersCount.reduce((total, count) => total + count, 0);
    const percentages = answersCount.map(count => ((count / totalAnswers) * 100).toFixed(2));

    const areas = [
        { index: 1, percentage: percentages[0], text: 'Você pode seguir carreira nos cursos de Enfermagem, Fisioterapia e Odontologia' },
        { index: 2, percentage: percentages[1], text: 'Você pode seguir carreira nos cursos de Administração, Direito, Psicologia e Pedagogia' },
        { index: 3, percentage: percentages[2], text: 'Você pode seguir carreira nos cursos de Arquitetura e Urbanismo, Engenharia Ambiental e Sistemas de Informação' },
        { index: 4, percentage: percentages[3], text: 'Você pode seguir carreira nos cursos de Educação Física e Nutrição' }
    ];

    areas.sort((a, b) => b.percentage - a.percentage);

    let result = `Resultados:\n`;

    for (const area of areas) {
        result += `${area.text}: ${area.percentage}%\n`;
    }

    document.getElementById('vocational-result').innerText = result;

    const resultLabels = ['Saúde', 'Humanas', 'Exatas', 'Saúde preventiva'];

    const chartData = {
        labels: resultLabels,
        datasets: [{
            label: 'Porcentagem',
            data: percentages,
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 206, 86, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    };

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';

    const canvas = document.getElementById('resultChart');
    const ctx = canvas.getContext('2d');
    new Chart(ctx, chartConfig);
}

openPopup();
