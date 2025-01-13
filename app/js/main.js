jQuery(function() {
    $(window).scroll(function() {
        let $this = $(this),
            $menu_top = $('.fixed-main-menu-wrap');
            $main_body = $('body');
        if ($this.scrollTop() > 150) {
            $menu_top.addClass('fixed-top-menu');
            $main_body.addClass('body-on-scroll');
        } else {
            $menu_top.removeClass('fixed-top-menu');
            $main_body.removeClass('body-on-scroll');
        }
    });
    let menu_selector = ".top-menu";

    function onScroll() {
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function() {
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    }
    $(document).ready(function() {
        $(document).on("scroll", onScroll);
        $(".navbar-nav a[href^='#']").click(function(e) {
            e.preventDefault();
            $(document).off("scroll");
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
            var hash = $(this).attr("href");
            var target = $(hash);
            $("html, body").animate({
                scrollTop: target.offset().top
            }, 500, function() {
                window.location.hash = hash;
                $(document).on("scroll", onScroll);
            });
        });
    });
    $('.lazy').lazy();
    let $top_anchor = $("#anchor");
    $(window).scroll(function() {
        let $this = $(this);
        if ($this.scrollTop() > 200) {
            $top_anchor.show();
        } else {
            $top_anchor.hide();
        }
    });
    $top_anchor.on("click", function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
    });
});