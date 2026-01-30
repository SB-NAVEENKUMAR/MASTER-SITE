
(function ($) {
    "use strict";

    // 1. SCROLL TO TOP BUTTON
    // Create the button
    $('body').append('<a href="#" id="scroll-to-top" class="dmtop global-radius"><i class="ion-ios-arrow-up"></i></a>');

    // Style it dynamically (or could be in CSS, but this keeps it self-contained)
    var $btn = $('#scroll-to-top');
    $btn.css({
        'position': 'fixed',
        'bottom': '20px',
        'right': '20px',
        'z-index': '999',
        'width': '40px',
        'height': '40px',
        'background-color': '#D4AF37', /* Gold */
        'color': '#000',
        'line-height': '40px',
        'text-align': 'center',
        'border-radius': '5px',
        'cursor': 'pointer',
        'opacity': '0',
        'transition': 'all .3s',
        'box-shadow': '0 2px 5px rgba(0,0,0,0.3)'
    });

    // Show/Hide logic
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $btn.css({ 'opacity': '1', 'visibility': 'visible' });
        } else {
            $btn.css({ 'opacity': '0', 'visibility': 'hidden' });
        }
    });

    // Click event
    $btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // 2. TYPING TEXT EFFECT
    // We will look for elements with class 'typewrite'
    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // Inject CSS for the cursor
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

})(jQuery);
