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
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {})
}

const setTooltips = () => {
    const elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});
}

document.addEventListener('DOMContentLoaded', function () {

    setOrdersFilter()
    setTooltips()
    setModal()
    setMenu()
});

