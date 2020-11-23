
(() => {
    // Nav Toggle

    const navtogglebutton = document.querySelector("#navtogglebutton");
    const navscreen = document.querySelector(".navigationMenu");
    const xButton = document.querySelector("#x-button");
    
    navtogglebutton.addEventListener('click', navToggleHandler);
    xButton.addEventListener('click', navToggleHandler);
    function navToggleHandler() {
        console.log("hello");
        navscreen.classList.toggle('toggleNav');
    }

})();
