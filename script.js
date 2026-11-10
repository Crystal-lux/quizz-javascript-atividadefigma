document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Banco de dados do Quiz: Gabarito + Justificativa pedagógica
    const quizData = {
        q1: {
            correct: 'A',
            explanation: '💡 O operador "let" permite reatribuição de valores durante o código, enquanto "const" bloqueia qualquer tentativa de mudança após ser definida.'
        },
        q2: {
            correct: 'B',
            explanation: '💡 "undefined" é o estado padrão de variáveis que acabaram de ser criadas na memória (declaradas) mas que ainda não receberam um dado real.'
        },
        q3: {
            correct: 'C',
            explanation: '💡 O operador "%" (módulo) faz a divisão inteira e devolve apenas o resto. Se o resto de um número por 2 for 0, sabemos matematicamente que ele é par.'
        },
        q4: {
            correct: 'A',
            explanation: '💡 O JavaScript usa "==" para checar apenas o valor (fazendo conversão automática), enquanto o "===" é estrito e exige que o tipo (ex: número vs string) também seja idêntico.'
        },
        q5: {
            correct: 'B',
            explanation: '💡 O método ".push()" empurra um novo elemento para a última posição disponível do Array. O método ".pop()" faz o inverso, removendo o último.'
        },
        q6: {
            correct: 'C',
            explanation: '💡 O bloco "else" funciona como uma rede de segurança final: suas linhas só são executadas se absolutamente nenhuma das condições testadas acima for verdadeira.'
        },
        q7: {
            correct: 'A',
            explanation: '💡 A sintaxe padrão do "for" exige: onde ele começa (inicialização), a validação para continuar rodando (condição) e como ele atualiza a cada volta (passo).'
        },
        q8: {
            correct: 'B',
            explanation: '💡 Funções isolam trechos de lógica sob um nome específico, permitindo que você chame e execute aquela mesma tarefa várias vezes sem precisar reescrever as mesmas linhas.'
        }
    };

    let score = 0;
    const totalQuestions = Object.keys(quizData).length;
    const formData = new FormData(event.target);

    // Remove explicações antigas se a pessoa estiver reenviando
    document.querySelectorAll('.explanation-box').forEach(el => el.remove());

    // Loop principal para avaliar cada questão inserida no HTML
    for (let key in quizData) {
        // Encontra o bloco HTML da pergunta correspondente
        const questionBlock = document.querySelector(`input[name="${key}"]`).closest('.question-block');
        const selectedAnswer = formData.get(key);
        const correctAnswer = quizData[key].correct;

        // Pega todos os inputs (labels) desta pergunta específica para colorir
        const labels = questionBlock.querySelectorAll('label');

        labels.forEach(label => {
            const input = label.querySelector('input');
            
            // Remove estilos de tentativas anteriores
            label.classList.remove('correct-answer', 'wrong-answer');

            // Se for a resposta correta oficial, pinta de Verde
            if (input.value === correctAnswer) {
                label.classList.add('correct-answer');
            }
            
            // Se o usuário marcou esta alternativa e ela estava errada, pinta de Vermelho
            if (input.value === selectedAnswer && selectedAnswer !== correctAnswer) {
                label.classList.add('wrong-answer');
            }
        });

        // Contabiliza o acerto
        if (selectedAnswer === correctAnswer) {
            score++;
        }

        // Cria e injeta a caixinha de texto com a justificativa embaixo da pergunta
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation-box';
        explanationDiv.innerHTML = quizData[key].explanation;
        questionBlock.appendChild(explanationDiv);
    }

    // Gerencia a exibição do placar final na base da página
    document.getElementById('submit-btn').classList.add('hidden');
    const resultBox = document.getElementById('result-box');
    const scoreText = document.getElementById('score-text');

    scoreText.textContent = `Você acertou ${score} de ${totalQuestions} questões!`;
    resultBox.classList.remove('hidden');
    
    resultBox.scrollIntoView({ behavior: 'smooth' });
});
