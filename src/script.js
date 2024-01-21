window.addEventListener("DOMContentLoaded", function() {

let passwordStrength = document.getElementById("password-strength");


function checkStrength(password) {
  let strength = 0;

  //If password contains both lower and uppercase characters
  if (password.match(/[a-z]/)) {
      strength += 1;
  }
  if (password.match(/[A-Z]/)) {
    strength += 1;
}
  //If it has numbers and characters
  if (password.match(/([0-9])/)) {
      strength += 1;
  } 
  //If it has one special character
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~,),(,+])/)) {
      strength += 1;
  }
  //If password is greater than 5
  if (password.length > 5) {
      strength += 1;
  }
  //If password is greater than 10
  if (password.length > 10) {
    strength += 1;
}

  // If value is less than 2
  if (strength <= 2) {
      passwordStrength.classList.remove('progress-bar-warning');
      passwordStrength.classList.remove('progress-bar-success');
      passwordStrength.classList.add('progress-bar-danger');
      passwordStrength.style = 'width: 15%';
  } 
  if (strength >= 3) {
      passwordStrength.classList.remove('progress-bar-success');
      passwordStrength.classList.remove('progress-bar-danger');
      passwordStrength.classList.add('progress-bar-warning');
      passwordStrength.style = 'width: 60%';
  }
   if (strength >= 4) {
      passwordStrength.classList.remove('progress-bar-warning');
      passwordStrength.classList.remove('progress-bar-danger');
      passwordStrength.classList.add('progress-bar-success');
      passwordStrength.style = 'width: 100%';
  }
}

document.querySelectorAll(".range").forEach(function (el) {
  el.oninput = function () {
    var valPercent = (el.valueAsNumber - parseInt(el.min)) /
      (parseInt(el.max) - parseInt(el.min));
    var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' + valPercent + ', #2563EB), color-stop(' + valPercent + ', #E2E8F0));';
    el.style = style;
  };
  el.oninput();
});

function distributeNumberInRandomOrder(number, parts) {
  let result = [];
  let remaining = number;

  for (let i = 0; i < parts - 1; i++) {
    let random;
    random  = number<parts ? Math.floor(Math.random() * (remaining)) : Password.generateNumberInRange(1,remaining-(parts-1-i));
    result.push(random);
    remaining -= random;
  }

  result.push(remaining);

  return result;
}

class Password {
  password = '';
  lowercase = "abcdefghijklmnopqrstuvwxyz";
  uppercase = this.lowercase.toUpperCase()
  symbols = "!@#$%^&*()_+~";
  numbers = "1234567890";
  spaces = " ";
  activeCharacterTypes = []
  
  
  static generateNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  new(length,activeCharacterTypes,excludeDuplicate) {
    this.activeCharacterTypes = activeCharacterTypes;
    this.passLength = length;
    this.excludeDuplicate = excludeDuplicate;
    this.generatePassword();
    return this.password
  }

  generatePassword() {

    this.password = '';
    let characterTypeCount = distributeNumberInRandomOrder(this.passLength,this.activeCharacterTypes.length)
    console.log(characterTypeCount)

    this.activeCharacterTypes.forEach((characterType,index) => {
        this.generateChars(characterTypeCount[index], this[characterType]);  
    })
    
  }

  generateChars(count, charSet) {
    let chars = [],randomChar;
    for (let i = 0; i < count; i++) {
      let position = Password.generateNumberInRange(0, this.passLength - 1);
      do {
      randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      while(this.excludeDuplicate && count <= charSet.length  && chars.includes(randomChar))
      chars.push(randomChar)
      this.password = [this.password.slice(0, position), randomChar, this.password.slice(position)].join('');
    }
  }
}


function generatePassword(event = null) {

  event?.preventDefault();

  let passwordLength = document.querySelector('[name="password_length"]').value;

  let characterTypes = [];
  document.querySelectorAll(".option").forEach((checkBox) => {
    if (checkBox.checked)
      characterTypes.push(checkBox.value)
  })

  let password = new Password();

  let excludeDuplicate = document.querySelector("#exc-duplicate").checked;
  document.querySelector('#password').value = password.new(passwordLength,characterTypes,excludeDuplicate)

  console.log(document.querySelector('#password').value.length)
  checkStrength(document.querySelector('#password').value)
  characterTypes = []

}



document.querySelector('[name="password_length"]').addEventListener('input', function() {
    document.querySelector("span#password_length").innerText = this.value
    generatePassword()  
})

document.querySelector("#generatePassword").addEventListener('click' , generatePassword);

function copyPassword() {
  navigator.clipboard.writeText(document.querySelector('#password').value)
}
})