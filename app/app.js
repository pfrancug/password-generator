'use strict';

var collection = {
    vowels: 'aeuy',
    consonants: 'bcdfghjkmnprstwz',
    numbers: '123456789',
    specials: '!@#$%'
};
var passLength = {
    letters: 6,
    numbers: 2,
    specials: false
};

var generatePassword = function generatePassword() {
    var password = '';
    var randomChar = function randomChar(set) {
        return set.charAt(Math.floor(Math.random() * set.length));
    };
    for (var i = 0; i < passLength.letters / 2; i++) {
        password += i ? randomChar(collection.consonants) : randomChar(collection.consonants).toUpperCase();
        password += randomChar(collection.vowels);
    }
    for (var _i = 0; _i < passLength.numbers; _i++) {
        password += randomChar(collection.numbers);
    }
    if (passLength.specials) {
        password += randomChar(collection.specials);
    }
    return password;
};

document.querySelector('#passLengthLetVal').addEventListener('change', function (e) {
    passLength.letters = e.target.value;
    localStorage.setItem('passLength', JSON.stringify(passLength));
    document.querySelector('#passLengthLetTxt').textContent = e.target.value;
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials;
});

document.querySelector('#passLengthNumVal').addEventListener('change', function (e) {
    passLength.numbers = e.target.value;
    localStorage.setItem('passLength', JSON.stringify(passLength));
    document.querySelector('#passLengthNumTxt').textContent = e.target.value;
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials;
});

document.querySelector('#specialChar').addEventListener('change', function (e) {
    passLength.specials = e.target.checked;
    localStorage.setItem('passLength', JSON.stringify(passLength));
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials;
});

if (localStorage.getItem('passLength')) {
    passLength = JSON.parse(localStorage.getItem('passLength'));
    document.querySelector('#passLengthLetVal').value = passLength.letters;
    document.querySelector('#passLengthLetTxt').textContent = passLength.letters;
    document.querySelector('#passLengthNumVal').value = passLength.numbers;
    document.querySelector('#passLengthNumTxt').textContent = passLength.numbers;
    document.querySelector('#specialChar').checked = passLength.specials;
    document.querySelector('#passLength').textContent = +passLength.letters + +passLength.numbers + passLength.specials;
}

document.querySelector('#passRadio1').addEventListener('change', function (e) {
    document.querySelector('#passCopyAuto').disabled = false;
    localStorage.setItem('passRadioVal', e.target.value);
});

document.querySelector('#passRadio10').addEventListener('change', function (e) {
    document.querySelector('#passCopyAuto').disabled = true;
    localStorage.setItem('passRadioVal', e.target.value);
});

if (localStorage.getItem('passRadioVal')) {
    document.querySelector('#passRadio' + localStorage.getItem('passRadioVal')).checked = true;
    document.querySelector('#passCopyAuto').disabled = localStorage.getItem('passRadioVal') !== '1';
}

document.querySelector('#passCopyAuto').addEventListener('change', function (e) {
    localStorage.setItem('passCopyAuto', e.target.checked);
});

document.querySelector('#passCopyAuto').checked = localStorage.getItem('passCopyAuto') === 'true';

var generatePassElement = function generatePassElement() {
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group my-1 col-12';
    var formControl = document.createElement('input');
    formControl.className = 'form-control alert-dark';
    formControl.id = 'pass';
    formControl.readOnly = true;
    formControl.type = 'text';
    formControl.value = generatePassword();
    var inputGroupAppend = document.createElement('div');
    inputGroupAppend.className = 'input-group-append';
    var button = document.createElement('button');
    button.className = 'btn btn-dark';
    button.innerText = 'Kopiuj';
    button.type = 'button';
    button.addEventListener('click', function () {
        formControl.select();
        document.execCommand('copy');
    });
    inputGroup.appendChild(formControl);
    inputGroup.appendChild(inputGroupAppend).appendChild(button);
    return inputGroup;
};

document.querySelector('#passGen').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#passwords').innerHTML = '';
    if (document.querySelector('#passRadio1').checked) {
        document.querySelector('#passwords').append(generatePassElement());
        if (document.querySelector('#passCopyAuto').checked) {
            document.querySelector('#pass').select();
            document.execCommand('copy');
        }
    } else if (document.querySelector('#passRadio10').checked) {
        for (var i = 0; i < document.querySelector('#passRadio10').value; i++) {
            document.querySelector('#passwords').append(generatePassElement());
        }
    }
});
