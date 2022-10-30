const engInput = document.querySelector('.input-eng');
const rusInput = document.querySelector('.input-rus');
const accInput = document.querySelector('.input-acc')
const inputs = document.querySelectorAll('.inputs');
const saveButton = document.querySelector('.btn');
const table = document.querySelector('.table');
const calc = document.querySelector('.calc');
const scrollTable = document.querySelector('.scroll-table-body');


let words;

if(!localStorage.getItem('words')) {
    words = [];
    scrollTable.style.display = 'none';
} else {
    words = JSON.parse(localStorage.getItem('words'));
}

let addWordToTable = index => {
    let arrTable = [index + 1, words[index].englishWord, words[index].accentWord, words[index].russianWord, `❌`];
    let tr = document.createElement(`tr`);
    table.prepend(tr);
    scrollTable.style.display = 'block';
    arrTable.forEach((item, idx) => {
        let td = document.createElement('td');
        td.innerHTML = item;
        tr.append(td);
        if(idx === 4) {
            td.classList.add('delete', `${index}`);
        };
    });
};

const calcWord = () => {
    if(words.length < 1) {
        calc.classList.add('none');
    }else {
        words?.forEach((item, idx) => {
            calc.classList.remove('none');
            calc.innerHTML = idx + 1;
        });
    };
};

const getWordsLength = () => {
    words.forEach((item, idx) => {
        addWordToTable(idx);
    });
    words.length === 0 ? scrollTable.style.display = 'none': scrollTable.style.display = 'block';
    calcWord();
}

getWordsLength();

class CreateWord {
    constructor(englishWord, accentWord, russianWord) {
        this.englishWord = englishWord;
        this.accentWord = accentWord;
        this.russianWord = russianWord;
    };
};

const checkMatch = () => {
    for(let i = 0; i < words?.length; i++){
        if(engInput.value === words[i].englishWord){
            engInput.classList.add('error');
            rusInput.value = '';
            accInput.value = '';
            engInput.value = '';
            alert('Такое слово уже есть в словаре. Зачем вам одинаковые слова, введите пожалуйста другое слово.')
            break;
        }else{
            engInput.classList.remove('error');
        };
    };
};

const attention = 'Одно из полей ввода пустое или введено число.Пожалуйста введите слова соответственно с их значениями в одноимённые поля.';

const enterButton = () => {
    if(engInput.classList.contains('error')){
        engInput.classList.remove('error');
    }else if(
        engInput.value.length < 1 ||
        !isNaN(engInput.value)
        ) {
        engInput.classList.add('error');
        accInput.classList.remove('error');
        rusInput.classList.remove('error');
        alert(attention);
    } else if(
        accInput.value.length < 1 ||
        !isNaN(accInput.value)
    ) {
        engInput.classList.remove('error');
        accInput.classList.add('error');
        rusInput.classList.remove('error');
        alert(attention);
    }else if(rusInput.value.length < 1 ||
        !isNaN(rusInput.value)
    ) {
        engInput.classList.remove('error');
        accInput.classList.remove('error');
        rusInput.classList.add('error');
        alert(attention);
    }else {
        for(let key of inputs) {
            key.classList.remove('error');
        };
        words.push(new CreateWord(engInput.value, accInput.value, rusInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        calcWord();
        rusInput.value = '';
        accInput.value = '';
        engInput.value = '';
    };
};

saveButton.addEventListener('click', () => {
    checkMatch();
    enterButton();
});

document.addEventListener('keydown', event => {
    if(event.keyCode === 13){
        checkMatch();
        enterButton();
    };
});

table.addEventListener('click', event => {
    let deleteButtons = Array.from(document.querySelectorAll('.delete'));
    if(event.target.classList.contains('delete')){
        deleteButtons.forEach((btn, i) => {
            if(btn === event.target) {
                words.forEach((obj, idx) => {
                    if(deleteButtons[i].classList.contains(`${idx}`)) {
                        words.splice(idx, 1);
                        localStorage.setItem('words', JSON.stringify(words));
                        table.innerHTML = ``;
                        getWordsLength();
                    };
                });
            };
        });
    };
});