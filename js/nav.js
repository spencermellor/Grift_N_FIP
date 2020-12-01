(() => {

    // Nav Toggle buttons
    const navtogglebutton = document.querySelector("#navtogglebutton");
    const xButton = document.querySelector("#x-button");
    
    // Screen to toggle
    const navscreen = document.querySelector(".navigationMenu");

    navtogglebutton.addEventListener('click', navToggleHandler);
    xButton.addEventListener('click', navToggleHandler);
    function navToggleHandler() {
        navscreen.classList.toggle('toggleNav');
    }

})();
