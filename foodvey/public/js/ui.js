const setMenu = () => {

    const elems = document.querySelectorAll('.sidenav');
    const options = { edge: 'left' }

    M.Sidenav.init(elems, options);
}

const setOrdersFilter = () => {
    const dateOptions = {
        format: 'dd/mm/yyyy',
        maxDate: new Date()
    }
    const elem = document.querySelectorAll('.datepicker');

    M.Datepicker.init(elem, dateOptions);
}

const setModal = () => {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {})
}

document.addEventListener('DOMContentLoaded', function () {

    setOrdersFilter()
    setModal()
    setMenu()
});

