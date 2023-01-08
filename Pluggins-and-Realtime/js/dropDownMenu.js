function DropDowmMenu(options) {
    const defaults = {
        target: null,
        menuContainer: null,
        menuWrapper: null
    };
    const opt = Object.assign(defaults, options || {});
    
    let targetBtn,
        menuContainer,
        menuWrapper;
    let isOpen = false;

    function init() {
        menuWrapper = document.querySelector(opt.menuWrapper);
        targetBtn = menuWrapper.querySelector(opt.target);
        menuContainer = menuWrapper.querySelector(opt.menuContainer);



        targetBtn.addEventListener('click', function() {
            isOpen = !isOpen;
            console.log('Hi menu', isOpen);
           // menuContainer.classList.add('open');
           if(isOpen) {
            menuContainer.classList.add('open');
            setTimeout(function() {
                document.addEventListener('click', documentClick);
            }, 300);
            
           } else {
            closeMenu();
           }
        });

        

    }
    init();

    function documentClick() {
        if(isOpen) {
            closeMenu();
        }
    }

    function closeMenu() {
        menuContainer.classList.remove('open');
        document.removeEventListener('click', documentClick);
        isOpen = false;
    }
    return {
        closeMenu: closeMenu
    }
}