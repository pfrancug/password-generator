const vowels = 'aeuy'
const consonants = 'bcdfghjkmnprstwz'
const numbers = '123456789'
const specials = '!@#$%'
// some letters and/or numbers are cut out
// due to the possibility of misunderstanding
let passLength = {
    letters: 6,
    numbers: 2,
    specials: 0,
}
let passNum = 0

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
    if (passLength.specials) {
        password += randomChar(specials)
    }
    return password
}

document.querySelector('#passLengthLetVal').addEventListener('change', (e) => {
    passLength.letters = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthLetTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + +passLength.specials
})

document.querySelector('#passLengthNumVal').addEventListener('change', (e) => {
    passLength.numbers = e.target.value
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLengthNumTxt').textContent = e.target.value
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + +passLength.specials
})

document.querySelector('#specialChar').addEventListener('change', (e) => {
    passLength.specials = e.target.checked === true ? 1 : 0
    localStorage.setItem('passLength', JSON.stringify(passLength))
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + +passLength.specials
})

if (localStorage.getItem('passLength')) {
    passLength = JSON.parse(localStorage.getItem('passLength'))
    document.querySelector('#passLengthLetVal').value = passLength.letters
    document.querySelector('#passLengthLetTxt').textContent = passLength.letters
    document.querySelector('#passLengthNumVal').value = passLength.numbers
    document.querySelector('#passLengthNumTxt').textContent = passLength.numbers
    document.querySelector('#specialChar').checked = passLength.specials
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + +passLength.specials
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
    document.querySelector('#passCopyAuto').disabled = localStorage.getItem('passRadioVal') !== '1' ? true : false
}

document.querySelector('#passCopyAuto').addEventListener('change', (e) => {
    localStorage.setItem('passCopyAuto', document.querySelector('#passCopyAuto').checked)
})

document.querySelector('#passCopyAuto').checked = localStorage.getItem('passCopyAuto') === 'true' ? true : false

const generatePassElement = () => {
    const newPass1 = document.createElement('div')
    newPass1.className = 'input-group my-1 col-12'

    const newPass2 = document.createElement('input')
    newPass2.className = 'form-control alert-dark'
    newPass2.id = 'pass'
    newPass2.readOnly = true
    newPass2.type = 'text'
    newPass2.value = generatePassword()

    const newPass3 = document.createElement('div')
    newPass3.className = 'input-group-append'

    const newPass4 = document.createElement('button')
    newPass4.className = 'btn btn-dark'
    newPass4.id = `passCopy${passNum += 1}`
    newPass4.innerText = 'Kopiuj'
    newPass4.type = 'button'

    newPass1.appendChild(newPass2)
    newPass1.appendChild(newPass3).appendChild(newPass4)
    document.querySelector('#passwords').prepend(newPass1)

    document.querySelector(`#passCopy${passNum}`).addEventListener('click', (e) => {
        e.path[1].previousElementSibling.select()
        document.execCommand('copy')
    })
}

const generateSpaceElement = () => {
    const newSpace = document.createElement('div')
    newSpace.className = 'progress-bar bg-secondary col-9'
    document.querySelector('#passwords').prepend(newSpace)
}

document.querySelector('#passGen').addEventListener('click', (e) => {
    e.preventDefault()
    if (document.querySelector('#passRadio1').checked) {
        generatePassElement()
        generateSpaceElement()
        if (document.querySelector('#passCopyAuto').checked) {
            document.querySelector('#pass').select()
            document.execCommand('copy')
        }
    } else if (document.querySelector('#passRadio10').checked) {
        for (let i = 0; i < document.querySelector('#passRadio10').value; i++) {
            generatePassElement()
        }
        generateSpaceElement()
    }
})