const engInput = document.querySelector('.input-eng');
const rusInput = document.querySelector('.input-rus');
const accInput = document.querySelector('.input-acc')
const inputs = document.querySelectorAll('.inputs');
const saveButton = document.querySelector('.btn');
const table = document.querySelector('.table');

let words;

if(!localStorage.getItem('words')) {
    words = []
} else {
    words = JSON.parse(localStorage.getItem('words'));
}

let addWordToTable = index => {
    table.innerHTML += `
        <tr>
            <td>
            ${index + 1}
            </td>
            <td>
            ${words[index].englishWord}
            </td>
            <td>
            ${words[index].accentWord}
            </td>
            <td>
            ${words[index].russianWord}
            </td>
            <td class="delete">
            ❌
            </td>
        </tr>
    `
};

const getWordsLength = () => {
    words?.forEach((item, idx) => {
        addWordToTable(idx);
    })
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
            console.log(1);
            
            engInput.classList.add('error');
            rusInput.value = '';
            accInput.value = '';
            engInput.value = '';
            break;
        }else{
            engInput.classList.remove('error');
        };
    };
};


const enterButton = () => {
    if(
        engInput.value.length < 1 ||
        !isNaN(engInput.value)
        ) {
        console.log(1);
        engInput.classList.add('error');
        accInput.classList.remove('error');
        rusInput.classList.remove('error');
    } else if(
        accInput.value.length < 1 ||
        !isNaN(accInput.value)
    ) {
        console.log(2);
        engInput.classList.remove('error');
        accInput.classList.add('error');
        rusInput.classList.remove('error');
    }else if(rusInput.value.length < 1 ||
        !isNaN(rusInput.value)
    ) {
        console.log(3);
        engInput.classList.remove('error');
        accInput.classList.remove('error');
        rusInput.classList.add('error');
    }else {
        console.log(4);
        
        for(let key of inputs) {
            key.classList.remove('error');
        };
        words.push(new CreateWord(engInput.value, accInput.value, rusInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);                                  
    };
    rusInput.value = '';
    accInput.value = '';
    engInput.value = '';
};

saveButton.addEventListener('click', () => {
    checkMatch();
    enterButton();
    deleteWord();
});

document.addEventListener('keydown', event => {
    if(event.keyCode === 13){
        checkMatch();
        enterButton();
        deleteWord();
    }
});

const deleteWord = () => {
    let deleteButtons = document.querySelectorAll('.delete');
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', () => {
            words.forEach((item, idx) => {
                if(idx === i) {
                    words.splice(idx, 1);
                    localStorage.setItem('words', JSON.stringify(words));
                    table.innerHTML = ``;
                    getWordsLength();
                };
            });
            deleteWord();
        });
    };
};

deleteWord();