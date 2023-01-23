function deepPostion(ele) {
    let eleObj = ele;
    let left= 0;
    let top = 0;
    while(eleObj) {
        left+= eleObj.offsetLeft;
        top+= eleObj.offsetTop;
        eleObj = eleObj.offsetParent;
    }
    return {
        left: left,
        top: top
    }
}

function DropDowmMenu(options) {
    const defaults = {
        target: null,
        menuContainer: null,
        menuWrapper: null,
        container: 'inline'
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

        if(opt.container === 'body') {
            document.body.appendChild(menuContainer);
        }


        targetBtn.addEventListener('click', function() {
            openMenu();
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
    function openMenu() {
        isOpen = !isOpen;
        console.log('Hi menu', isOpen);
       // menuContainer.classList.add('open');
       
       if(isOpen) {
        menuContainer.classList.add('open');
        menuContainer.style.top = '0px';
        setTimeout(function() {
            document.addEventListener('click', documentClick);
        }, 300);
        
       } else {
        closeMenu();
       }
       if(opt.container === 'body') {
        setPostion();
       }
    }

    function setPostion() {
        console.dir(targetBtn)
        const pos = deepPostion(targetBtn);
        let wW = window.innerWidth;
        let wH = window.innerHeight;
        let pL = pos.left + menuContainer.offsetWidth;
        console.log(pos);
        let lPos = pos.left;
        console.log(menuContainer.offsetWidth)
        console.dir(menuContainer)
        if(pL > wW) {
            lPos = (pos.left - menuContainer.offsetWidth) + targetBtn.offsetWidth;
        }
       // let btnPos = 
       let topP = pos.top + targetBtn.offsetHeight;
       menuContainer.style.top = topP + 'px';
       menuContainer.style.left = lPos + 'px';
    }
    return {
        closeMenu: closeMenu
    }
}