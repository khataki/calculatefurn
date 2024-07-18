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