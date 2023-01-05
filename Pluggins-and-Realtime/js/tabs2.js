function Tabs (options) {
    var opt = {
        tabsContainer: '.tabs',
        tabsMenus: '.tabs-menu',
        tabsMenusList: 'li',
        tabsContent: '.tab-content',
        active: 0,
    };

    this.opt =  Object.assign(opt, options);

    var tabs;
    
    var _this = this;

    init();

    function init() {
        tabs = document.querySelectorAll(_this.opt.tabsContainer);
       
        tabs.forEach(function(ele){
            const tabMenu = ele.querySelector(_this.opt.tabsMenus);
            const tabMenuList = tabMenu.querySelectorAll(_this.opt.tabsMenusList);
            const tabContentAll = ele.querySelectorAll(_this.opt.tabsContent);

            let currentIndex =  _this.opt.active;
            let prevIndex = null;

            const liC = tabMenuList[currentIndex];
            liC.classList.add('active');
            const ttabC = ele.querySelector(liC.getAttribute('data-tabid'));
            ttabC.classList.add('active');

            tabMenuList.forEach(function(tList, ind) {
                tList.addEventListener('click', function() {
                    prevIndex = currentIndex;
                    currentIndex = ind;

                    tList.classList.add('active');
                    const tabC = tList.getAttribute('data-tabid');
                    const tabCC = ele.querySelector(tabC);
                    tabCC.classList.add('active');

                    const liPrev = tabMenuList[prevIndex];
                    liPrev.classList.remove('active');
                    const tabCC2 = ele.querySelector(liPrev.getAttribute('data-tabid'));
                    tabCC2.classList.remove('active');
                })
            });
        });
    }
}