jQuery(function() {

    // Top Navigation Mobile Menu
    let mobileToggleMenu = $(".nav-button-toggle");

    function openMobileMenu(e){
        e.preventDefault();
        let mainParent = $(this).parent().parent();
        let mainMenuWrapper = mainParent.find('.inner-header--mobile-body');
        mainMenuWrapper.toggleClass('open-mobile-menu');
    }

    mobileToggleMenu.on('click', openMobileMenu);

    // Adding top Fixed header
    $(window).scroll(function() {
        let $this = $(this),
            $menuTop = $(".static-inner-header");
        $mainBody = $("body");
        if ($this.scrollTop() > 150) {
            $menuTop.addClass("fixed-top-menu");
            $mainBody.addClass("body-on-scroll");
        } else {
            $menuTop.removeClass("fixed-top-menu");
            $mainBody.removeClass("body-on-scroll");
        }
    });

    // Make the switch of active menu items
    let operationalMenuItem = $(".general-menu li");

    function makeMenuItemActive () {
        $(this).addClass('active').siblings().removeClass('active');
    }

    operationalMenuItem.on("click", makeMenuItemActive);      
});