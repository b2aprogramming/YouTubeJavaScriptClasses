function Tabs(options) {
    var opt = {
        tabsContainer: '.tabs',
        tabsMenus: '.tabs-menu',
        tabsMenusList: 'li',
        tabsContent: '.tab-content',
        active: 0,
    };
    this.opt =  Object.assign(opt, options);

    var tabs, 
        tabMenu, 
        tabMenuList,
        tabContent;

    let currentIndex =  this.opt.active;
    let prevIndex = null;
    var _this = this;

    init();
   function init() {
        tabs = document.querySelector(_this.opt.tabsContainer);
        tabMenu = tabs.querySelector(_this.opt.tabsMenus);
        tabMenuList = tabMenu.querySelectorAll(_this.opt.tabsMenusList);
        tabContent = tabs.querySelectorAll(_this.opt.tabsContent);
        tabContent[currentIndex].classList.add('active');
        tabMenuList[currentIndex].classList.add('active');

        tabMenuList.forEach(function(ele, ind) {
            ele.addEventListener('click', function() {
                prevIndex = currentIndex;
                currentIndex = ind;
                if(prevIndex !== null) {
                    tabContent[prevIndex].classList.remove('active');
                    tabMenuList[prevIndex].classList.remove('active');
                }
                tabContent[ind].classList.add('active');
               //tabContent[ind].style.display = 'block';
               ele.classList.add('active');
            })
        });

   }
   
}