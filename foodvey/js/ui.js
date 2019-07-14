document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var options = { edge: 'left' }

    M.Sidenav.init(elems, options);
});