// script.js
document.addEventListener('DOMContentLoaded', function() {
    generateSurvey();
    document.getElementById('submit-survey').addEventListener('click', submitSurvey);
});

function generateSurvey() {
    document.getElementById('survey-title').textContent = surveyConfig.title;
    const questionsContainer = document.getElementById('questions-container');

    surveyConfig.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>問題 ${index + 1}: ${question.text}</h3>
            <p>（最多選擇 ${question.maxSelect} 項）</p>
            <div class="options"></div>
        `;

        const optionsContainer = questionDiv.querySelector('.options');
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.innerHTML = `
                <img src="${option.image}" alt="${option.text}">
                <input type="checkbox" name="q${index}" value="${option.text}" id="q${index}o${optionIndex}">
                <label for="q${index}o${optionIndex}">${option.text}</label>
            `;
            optionsContainer.appendChild(optionDiv);
        });

        questionsContainer.appendChild(questionDiv);
    });

    addCheckboxLimit();
}

function addCheckboxLimit() {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        const checkboxes = question.querySelectorAll('input[type="checkbox"]');
        const maxAllowed = surveyConfig.questions[index].maxSelect;

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

function submitSurvey() {
    const answers = [];
    surveyConfig.questions.forEach((question, index) => {
        const checkedOptions = document.querySelectorAll(`input[name="q${index}"]:checked`);
        const answer = Array.from(checkedOptions).map(option => option.value);
        answers.push(answer);
    });

    // 這裡我們將使用 Google Sheets API 來保存數據
    // 注意：您需要設置 Google Sheets API 並獲取必要的憑證
    saveToGoogleSheets(answers);
}

function saveToGoogleSheets(answers) {
    // 這裡需要您的 Google Sheets API 設置
    // 包括 API 密鑰、表格 ID 等
    const API_KEY = 'YOUR_API_KEY';
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
    const RANGE = 'Sheet1!A:A'; // 根據您的需求調整範圍

    gapi.load('client', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: RANGE,
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [answers.map(ans => ans.join(', '))]
                }
            }).then((response) => {
                console.log('數據已保存到 Google Sheets');
                alert('感謝您的參與！您的回答已經被記錄。');
            }, (error) => {
                console.error('保存數據時出錯', error);
                alert('抱歉，保存您的回答時出現了問題。請稍後再試。');
            });
        });
    });
}