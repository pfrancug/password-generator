const vowels = 'aeuy'
const consonants = 'bcdfghjkmnprstwz'
const numbers = '123456789'
const specials = '!@#$%'
let passLength = {
    letters: 6,
    numbers: 2,
    specials: false,
}
let passNum = 0

const generatePassword = () => {
    let password = ''
    const randomChar = (set) => {
        return set.charAt(Math.floor(Math.random() * set.length))
    }
    for (let i = 0; i < passLength.letters / 2; i++) {
        password += i ? randomChar(consonants) : randomChar(consonants).toUpperCase()
        password += randomChar(vowels)
    }
    for (let i = 0; i < passLength.numbers; i++) {
        password += randomChar(numbers)
    }
    if (passLength.specials) {
        password += randomChar(specials)
    }
    return password
}

document.querySelector('#passLengthLetVal').addEventListener('change', (e) => {
    passLength.letters = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthLetTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials
})

document.querySelector('#passLengthNumVal').addEventListener('change', (e) => {
    passLength.numbers = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthNumTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials
})

document.querySelector('#specialChar').addEventListener('change', (e) => {
    passLength.specials = e.target.checked
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials
})

if (localStorage.getItem('passLength')) {
    passLength = JSON.parse(localStorage.getItem('passLength'))
    document.querySelector('#passLengthLetVal').value = passLength.letters
    document.querySelector('#passLengthLetTxt').textContent = passLength.letters
    document.querySelector('#passLengthNumVal').value = passLength.numbers
    document.querySelector('#passLengthNumTxt').textContent = passLength.numbers
    document.querySelector('#specialChar').checked = passLength.specials
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials
}

document.querySelector('#passRadio1').addEventListener('change', (e) => {
    document.querySelector('#passCopyAuto').disabled = false
    localStorage.setItem('passRadioVal', e.target.value)
})

document.querySelector('#passRadio10').addEventListener('change', (e) => {
    document.querySelector('#passCopyAuto').disabled = true
    localStorage.setItem('passRadioVal', e.target.value)
})

if (localStorage.getItem('passRadioVal')) {
    document.querySelector(`#passRadio${localStorage.getItem('passRadioVal')}`).checked = true
    document.querySelector('#passCopyAuto').disabled = localStorage.getItem('passRadioVal') !== '1'
}

document.querySelector('#passCopyAuto').addEventListener('change', (e) => {
    localStorage.setItem('passCopyAuto', document.querySelector('#passCopyAuto').checked)
})

document.querySelector('#passCopyAuto').checked = localStorage.getItem('passCopyAuto') === 'true'

const generatePassElement = () => {
    const inputGroup = document.createElement('div')
    inputGroup.className = 'input-group my-1 col-12'
    const formControl = document.createElement('input')
    formControl.className = 'form-control alert-dark'
    formControl.id = 'pass'
    formControl.readOnly = true
    formControl.type = 'text'
    formControl.value = generatePassword()
    const inputGroupAppend = document.createElement('div')
    inputGroupAppend.className = 'input-group-append'
    const button = document.createElement('button')
    button.className = 'btn btn-dark'
    button.id = `passCopy${passNum += 1}`
    button.innerText = 'Kopiuj'
    button.type = 'button'
    button.addEventListener('click', (e) => {
        formControl.select()
        document.execCommand('copy')
    })
    inputGroup.appendChild(formControl)
    inputGroup.appendChild(inputGroupAppend).appendChild(button)
    return inputGroup
}

document.querySelector('#passGen').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('#passwords').innerHTML = ''
    if (document.querySelector('#passRadio1').checked) {
        document.querySelector('#passwords').append(generatePassElement())
        if (document.querySelector('#passCopyAuto').checked) {
            document.querySelector('#pass').select()
            document.execCommand('copy')
        }
    } else if (document.querySelector('#passRadio10').checked) {
        for (let i = 0; i < document.querySelector('#passRadio10').value; i++) {
            document.querySelector('#passwords').append(generatePassElement())
        }
    }
})