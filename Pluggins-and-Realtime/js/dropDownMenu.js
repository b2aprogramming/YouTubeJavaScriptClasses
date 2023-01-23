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

    function resize() {
        closeMenu();
       // setPostion();
    }

    function closeMenu() {
        menuContainer.classList.remove('open');
        document.removeEventListener('click', documentClick);
        window.removeEventListener('resize', resize);
        isOpen = false;
    }
    function openMenu() {
        isOpen = !isOpen;
        console.log('Hi menu', isOpen);
       // menuContainer.classList.add('open');
       
       if(isOpen) {
        menuContainer.classList.add('open');
        
        setTimeout(function() {
            document.addEventListener('click', documentClick);
            window.addEventListener('resize', resize);
        }, 300);
        
       } else {
        closeMenu();
       }
       if(opt.container === 'body') {
        menuContainer.style.top = '0px';
       }
       setPostion();
    }

    function positionValues() {
        const pos = deepPostion(targetBtn);
        let wW = window.innerWidth;
        let wH = window.innerHeight;
        let pL = pos.left + menuContainer.offsetWidth;
        let pT = pos.top + menuContainer.offsetHeight;
        let lPos = pos.left;
        let tPos = pos.top + targetBtn.offsetHeight;
        let menuLeftPos = false;
        let menuTopPos = false;
        if(pL > wW) {
            lPos = (pos.left - menuContainer.offsetWidth) + targetBtn.offsetWidth;
            menuLeftPos = true;
        }

        if(pT > wH) {
            tPos = (pos.top - menuContainer.offsetHeight - targetBtn.offsetHeight) + targetBtn.offsetHeight;
            menuTopPos = true;
        }
        return {
            left: lPos,
            top: tPos,
            w: menuLeftPos,
            h: menuTopPos
        }
    }

    function setPostion() {
        const pos = positionValues();

       if(opt.container === 'body') {
        menuContainer.style.top = pos.top + 'px';
        menuContainer.style.left = pos.left + 'px';
       }else {
        if(pos.w) {
            menuContainer.style.left ='auto';
            menuContainer.style.right ='0px';
        }
        if(pos.h) {
            menuContainer.style.top ='auto';
            menuContainer.style.bottom ='100%';
        }
       }

       
    }

    return {
        close: closeMenu,
        open: openMenu
    }
}