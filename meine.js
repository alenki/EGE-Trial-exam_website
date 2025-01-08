
// Form
const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const priceSum = document.querySelector("#priceSum")
const requiredFields = document.querySelectorAll(".reqField")
const checkBoxes = document.querySelectorAll('.form-check-input')
const scriptURL = 'https://script.google.com/macros/s/AKfycbxC14lOYw13DpXF_RNEpHWn-SK1_oDqDUN_n0j3Z6_Grp6Q3GnGLomoGBh2RJ9kakePHw/exec'

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
    let requestBody = new FormData(form)
    fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
        // alert('Success!', response)
        // submitButton.disabled = false
        // location.reload();
        // var all_id = document.getElementsByName("product_id[]");
        // for(var i = 0; i<all_id.length; ++i){
        //     form.append("id_list", all_id[i].getAttribute("value"));
        // }
        // console.log(form);
        // console.log(requestBody);
        // fetch('https://sale.giakbsu.ru/payment/form', {
        //     method: 'POST',
        //     // mode: 'no-cors',
        //     body: requestBody
        //     }).then((response) => { 
        //         // do something with response here... 
        //     });
        // var request = new XMLHttpRequest();
        // request.open('POST', 'https://sale.giakbsu.ru/payment/form');
        // request.send(form);
        form.submit();
    })
    .catch(error => {
        alert('Error!', error.message)
        submitButton.disabled = false
    })
}
// End of Form