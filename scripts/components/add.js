document.addEventListener('DOMContentLoaded', function () {
    const facadeSelect = document.getElementById('facade');
    const ventFacadeOptions = document.getElementById('ventFacadeOptions');
    const standRigSystemOptions = document.getElementById('standRigSystemOptions');
    const sandwichPanelOptions = document.getElementById('sandwichPanelOptions');

    facadeSelect.addEventListener('change', function () {
        const selectedFacade = facadeSelect.value;

        // Скрываем все дополнительные опции
        ventFacadeOptions.classList.add('hidden');
        standRigSystemOptions.classList.add('hidden');
        sandwichPanelOptions.classList.add('hidden');

        // Отображаем нужные дополнительные опции в зависимости от выбранного типа фасада
        if (selectedFacade === 'вентилируемый фасад') {
            ventFacadeOptions.classList.remove('hidden');
        } else if (selectedFacade === 'стоечно-ригельная система') {
            standRigSystemOptions.classList.remove('hidden');
        } else if (selectedFacade === 'сендвич панель') {
            sandwichPanelOptions.classList.remove('hidden');
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('.contact-info input');
    const commercialOfferButton = document.getElementById('commercialOfferButton');
    const paymentInvoiceButton = document.getElementById('paymentInvoiceButton');
    const consentCheckbox = document.getElementById('consent');

    function checkFormCompletion() {
        let allFilled = true;
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });

        if (allFilled && consentCheckbox.checked) {
            commercialOfferButton.style.display = 'block';
            paymentInvoiceButton.style.display = 'block';
        } else {
            commercialOfferButton.style.display = 'none';
            paymentInvoiceButton.style.display = 'none';
        }
    }

    formInputs.forEach(input => {
        input.addEventListener('input', checkFormCompletion);
    });

    consentCheckbox.addEventListener('change', checkFormCompletion);

    checkFormCompletion(); // Initial check to set button visibility on page load
});
