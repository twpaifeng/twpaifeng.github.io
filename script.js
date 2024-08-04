let questionCount = 0;

function addQuestion() {
    questionCount++;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');
    questionContainer.innerHTML = `
        <h3>問題 ${questionCount}</h3>
        <input type="text" class="question-text" placeholder="輸入問題">
        <input type="number" class="max-options" min="1" placeholder="最大可選數量">
        <div class="options"></div>
        <button onclick="addOption(this)">添加選項</button>
        <button onclick="removeQuestion(this)">刪除問題</button>
    `;
    document.getElementById('questions-container').appendChild(questionContainer);
}

function addOption(button) {
    const optionsContainer = button.parentElement.querySelector('.options');
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerHTML = `
        <input type="text" placeholder="選項文字">
        <button onclick="removeOption(this)">刪除</button>
    `;
    optionsContainer.appendChild(optionDiv);
}

function removeQuestion(button) {
    button.parentElement.remove();
}

function removeOption(button) {
    button.parentElement.remove();
}

function generateSurvey() {
    const surveyContent = document.getElementById('survey-content');
    surveyContent.innerHTML = '';
    const questions = document.querySelectorAll('.question');

    questions.forEach((question, index) => {
        const questionText = question.querySelector('.question-text').value;
        const maxOptions = question.querySelector('.max-options').value;
        const options = question.querySelectorAll('.option input[type="text"]');
        
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <h3>問題 ${index + 1}: ${questionText}</h3>
            <p>（最多選擇 ${maxOptions} 項）</p>
            <div class="options"></div>
        `;

        const optionsContainer = questionDiv.querySelector('.options');
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = `
                <input type="checkbox" name="q${index}" value="${option.value}">
                <label>${option.value}</label>
            `;
            optionsContainer.appendChild(optionDiv);
        });

        surveyContent.appendChild(questionDiv);
    });

    document.getElementById('survey-preview').style.display = 'block';
    addCheckboxLimit();
}

function addCheckboxLimit() {
    const questions = document.querySelectorAll('#survey-content > div');
    questions.forEach(question => {
        const checkboxes = question.querySelectorAll('input[type="checkbox"]');
        const maxAllowed = parseInt(question.querySelector('p').textContent.match(/\d+/)[0]);

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = question.querySelectorAll('input[type="checkbox"]:checked').length;
                if (checkedCount > maxAllowed) {
                    this.checked = false;
                }
                checkboxes.forEach(cb => {
                    cb.disabled = checkedCount >= maxAllowed && !cb.checked;
                });
            });
        });
    });
}

document.getElementById('add-question').addEventListener('click', addQuestion);
document.getElementById('generate-survey').addEventListener('click', generateSurvey);