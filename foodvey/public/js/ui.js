const setMenu = () => {

    const elems = document.querySelectorAll('.sidenav');
    const options = { edge: 'left' }

    M.Sidenav.init(elems, options);
}

const setOrdersFilter = () => {
    const dateOptions = { format: 'dd/mm/yyyy' }
    const elem = document.querySelectorAll('.datepicker');

    M.Datepicker.init(elem, dateOptions);
}

document.addEventListener('DOMContentLoaded', function () {

    setOrdersFilter()
    setMenu()
});

