jQuery(function () {

    // Top Navigation Mobile Menu
    let mobileToggleMenu = $(".nav-button-toggle");

    function openMobileMenu(e) {
        e.preventDefault();
        let mainParent = $(this).parent().parent();
        let mainMenuWrapper = mainParent.find('.inner-header--mobile-body');
        mainMenuWrapper.toggleClass('open-mobile-menu');
    }

    mobileToggleMenu.on('click', openMobileMenu);

    // Adding top Fixed header
    $(window).scroll(function () {
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

    function makeMenuItemActive() {
        $(this).addClass('active').siblings().removeClass('active');
    }

    operationalMenuItem.on("click", makeMenuItemActive);

    // Track the state of class addition/removal
    function adaptiveFixedMenuBehaviour() {
        let $firstMenuItemLi = $(".main-menu .menu-item:first-child");
        let $mainBody = $("body");

        // Only add the class if the first menu item is active and the body does not have 'body-on-scroll',
        // and if the clicked menu item is not the first item ("Головна")
        if ($firstMenuItemLi.hasClass("active") && !$mainBody.hasClass("body-on-scroll") && !$mainBody.hasClass("went-from-site-top-part")) {
            console.log('Adding class went-from-site-top-part');
            $mainBody.addClass("went-from-site-top-part");
        }
    }

// Handle click events on all menu items
    $(".main-menu .menu-item a").on("click", function() {
        let $mainBody = $("body");
        let $clickedLink = $(this);

        // Check if the clicked link is not the "Головна" link
        if (!$clickedLink.is('.menu-item:first-child a')) {
            // Remove the class only if it exists
            if ($mainBody.hasClass("went-from-site-top-part")) {
                console.log('Removing class went-from-site-top-part');
                $mainBody.removeClass("went-from-site-top-part");
            }

            // Call the function to check if the class should be added after a menu click
            adaptiveFixedMenuBehaviour();
        } else {
            console.log('Click on "Головна" - class will not be added');
        }
    });

// Scroll handling for panels and removing class only during user scroll
    $(window).on('wheel touchmove keydown', function(event) {
        // Check if the scroll event happened inside any .panel section
        $(".panel").each(function() {
            let section = $(this);
            let sectionOffset = section.offset().top;
            let sectionHeight = section.outerHeight();
            let scrollPosition = $(window).scrollTop();

            // If the scroll position is within the section, remove the class
            if (scrollPosition >= sectionOffset && scrollPosition <= sectionOffset + sectionHeight) {
                let $mainBody = $("body");
                if ($mainBody.hasClass("went-from-site-top-part")) {
                    console.log('Removing class went-from-site-top-part during user scroll in .panel section');
                    $mainBody.removeClass("went-from-site-top-part");
                }
            }
        });
    });
});