const vowels = 'aeuy'
const consonants = 'bcdfghjkmnprstwz'
const numbers = '123456789'
let passLength = {
    letters: 6,
    numbers: 2,
}

const generatePassword = () => {
    let password = ''
    const randomChar = (set) => {
        return set.charAt(Math.floor(Math.random() * set.length))
    }
    for (let i = 0; i < passLength.letters / 2; i++) {
        password += i === 0 ? randomChar(consonants).toUpperCase() : randomChar(consonants)
        password += randomChar(vowels)
    }
    for (let i = 0; i < passLength.numbers; i++) {
        password += randomChar(numbers)
    }
    return password
}

document.querySelector('#passLengthLetVal').addEventListener('change', (e) => {
    passLength.letters = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthLetTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers
})

document.querySelector('#passLengthNumVal').addEventListener('change', (e) => {
    passLength.numbers = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthNumTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers
})

if (localStorage.getItem('passLength') !== null) {
    passLength = JSON.parse(localStorage.getItem('passLength'))
    document.querySelector('#passLengthLetVal').value = passLength.letters
    document.querySelector('#passLengthLetTxt').textContent = passLength.letters
    document.querySelector('#passLengthNumVal').value = passLength.numbers
    document.querySelector('#passLengthNumTxt').textContent = passLength.numbers
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers
}

document.querySelector('#passSave').addEventListener('change', (e) => {
    localStorage.setItem('passSave', document.querySelector('#passSave').checked)
})
if (localStorage.getItem('passSave') === 'true') {
    document.querySelector('#passSave').checked = true
}

const passwordsArray = () => {
    Array.from(document.querySelectorAll('#passCopy')).forEach(copy => {
        copy.addEventListener('click', function (event) {
            this.parentElement.previousElementSibling.select()
            document.execCommand('copy')
        })
    })
}
document.querySelector('#passGen').addEventListener('click', (e) => {
    e.preventDefault()
    const passwords = document.querySelector('#passwords')
    passwords.insertAdjacentHTML('afterbegin',
        "<div class='input-group my-1 col-8'><input type='text' class='form-control' placeholder='password' id='pass' readonly><div class='input-group-append '><button class='btn btn-outline-dark' type='button' id='passCopy'>Kopiuj</button></div></div>"
    )
    passwordsArray()
    document.querySelector('#pass').value = generatePassword()
    if (document.querySelector('#passSave').checked === true) {
        document.querySelector('#pass').select()
        document.execCommand('copy')
    }
})