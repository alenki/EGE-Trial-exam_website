
// Form
const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const priceSum = document.querySelector("#priceSum")
const requiredFields = document.querySelectorAll(".reqField")
const checkBoxes = document.querySelectorAll('.form-check-input')
const enrollModal = new bootstrap.Modal(document.getElementById('enroll')); 

// Проверка при любом инпуте
window.onload = function() {
    form.addEventListener('input', function() {
        // Количество выбранных предметов
        var checkAmount = 0;
        for(var i = 0; i<checkBoxes.length; i++){
            if(checkBoxes[i].checked){
                checkAmount++;
            }
        }
        
        // Суммарная цена
        priceSum.innerHTML = checkAmount*600 + "р";

        // Проверка заполнения полей
        const allFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
        if (allFilled && checkAmount>=0) {
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
    form.submit();
}
// End of Form

// Disciplines 
document.onclick = function(e) {
    if(e.target.classList.contains("discipline-text")){
        // open enroll modal and check the involved checkbox
        for(var i = 0; i<checkBoxes.length; ++i){
            if(e.target.id==checkBoxes[i].value){
                checkBoxes[i].setAttribute("checked","");
                // call "input" event for form to update price
                form.dispatchEvent(new Event("input"));
            }
        }
        enrollModal.show();
    }
};
// End of Disciplines