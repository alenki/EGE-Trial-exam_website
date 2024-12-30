
// Form
const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const requiredFields = document.querySelectorAll(".reqField")
const checkBoxes = document.querySelectorAll('.form-check-input')
const scriptURL = 'https://script.google.com/macros/s/AKfycbxC14lOYw13DpXF_RNEpHWn-SK1_oDqDUN_n0j3Z6_Grp6Q3GnGLomoGBh2RJ9kakePHw/exec'

// Проверка при любом инпуте
window.onload = function() {
    form.addEventListener('input', function() {
        // Проверка хотябы одного выбранного предмета
        var oneChecked = false;
        for(var i = 0; i<checkBoxes.length; i++){
            if(checkBoxes[i].checked){
                oneChecked = true;
            }
        }
        // Проверка заполнения полей
        const allFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
        if (allFilled && oneChecked) {
            submitButton.classList.remove('disabled');
            submitButton.setAttribute("aria-disabled", "false");
            submitButton.setAttribute("tabindex", "0");
        } else {
            submitButton.classList.add('disabled');
            submitButton.setAttribute("aria-disabled", "true");
            submitButton.setAttribute("tabindex", "-1");
        }
    });
}
// Обработка подтверждения регистрации
submitButton.onclick = function(e) {
    submitButton.disabled = true
    e.preventDefault()
    let requestBody = new FormData(form)
    fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
        // alert('Success!', response)
        // submitButton.disabled = false
        location.reload();
    })
    .catch(error => {
        alert('Error!', error.message)
        submitButton.disabled = false
    })
}

// End of Form