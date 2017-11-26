$(document).ready(function () {
    // strict mode syntax
    'use strict';

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    $("#yt_player").tubeplayer({
        width: 560, // the width of the player
        height: 315, // the height of the player
        allowFullScreen: "true", // true by default, allow user to go full screen
        initialVideo: "OEBJF3juO84", // the video that is loaded into the player
        preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
        onPlay: function (id) {
            aconsole.log("start");
            //$("#yt_player").animate({width:"100%"});
        }, // after the play method is called
        onPlayerUnstarted: function () {
            console.log("unstarted");
        },
        onPause: function () {
        }, // after the pause method is called
        onStop: function () {
        }, // after the player is stopped
        onSeek: function (time) {
        }, // after the video has been seeked to a defined point
        onMute: function () {
        }, // after the player is muted
        onUnMute: function () {
        } // after the player is unmuted
    });


    function nextModuleID() {
        return "module" + moduleCounter++;
    }

    var moduleCounter = 0;
    var moduleID = nextModuleID();
    var nav = $('#nav');

    //$('.wrapper > .module').each(function () {
	$('.wrapper > .module[data-navigationTitle]').each(function () {
        var e = $(this);
        // set optional moduleID
        if (e.attr("id"))
            moduleID = e.attr("id");
        else
            e.attr("id", moduleID);
        var navigationTitle = e.attr("data-navigationTitle");
        var navigationUrl = e.attr("data-navigationUrl");
        var navigationTarget = e.attr("data-navigationTarget");
        var moduleHelper = "";
        var helper = "";
//        nav.append($('<li><a href="#' + moduleID + '"><span style="    display: block;    padding-left: 28px;    line-height: initial;">' + navigationTitle + '</span></a></li>'));
        if(typeof navigationUrl === "undefined")
        {
		      moduleHelper = "'#"+moduleID+"'";
//		      helper = '<li><a href="#' + moduleID + '" onclick="location.href='+moduleHelper+'; scrollFromToModule($('+moduleHelper+')); return false;"><span style="    display: block;    padding-left: 28px;    line-height: initial;">' + navigationTitle + '</span></a></li>'
		      helper = '<li><a href="#' + moduleID + '" onclick="scrollFromToModule($('+moduleHelper+')); return false;"><span style="    display: block;    padding-left: 28px;    line-height: initial;">' + navigationTitle + '</span></a></li>'
        }
        else
        {
		      moduleHelper = "";
		      helper = '<li><a href="' + navigationUrl + '" target="'+ navigationTarget +'" ><span style="    display: block;    padding-left: 28px;    line-height: initial;">' + navigationTitle + '</span></a></li>'
        }
        nav.append($(helper));
        moduleID = nextModuleID();
        $('.next-section', e).attr("href", '#' + moduleID);
    });
    setTimeout(function(){$('#primary').fadeIn();},1500);

    // Responsive Nav collapse
    $('.nav-collapse').click('li', function () {
        $('.nav-collapse').collapse('hide');
    });

    $('a.next-section').click(scrollToNextModule);
//    $('#nav a').click(function (event) {
//        $('#nav .active').removeClass("active");
//        event.preventDefault();
//        var listEntry = $(this).parent();
//        listEntry.addClass("active");
//        scrollToModule($('.module:eq(' + listEntry.parent().children().index(listEntry) + ')'));
//    });

    $('#nav').onePageNav({
        currentClass: 'active',
        scrollOffset: (viewportHeight / 2) - 250,
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
        begin: function () {
            var moduleID = $(this).attr("href");
            scrollToModule($(moduleID));
        },
        end: function () {
        },
        scrollChange: function ($currentListItem) {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });

    // alle slider
    $("ul.rslides").responsiveSlides({
        auto: true,
        pager: true,
        nav: true,
        speed: 500,
        maxwidth: 1200,
        namespace: "centered-btns"
    });

    var sliderNaviItems = $(".slider_navi_item");
    sliderNaviItems.click(function () {
        var index = $(this).parent().children().index(this);
        var module = $(this).parents(".module");
        $(".slider_navi_item", module).css('z-index', 1);
        $(this).css('z-index', 10);

        $(".rslides_container", module).hide();
        $(".rslides_container:eq(" + index + ")", module).show();
    });
    $('.slider_navi_item', $('.slider_navi')).first().trigger('click');


// Top Session Scroll Animate Script
    $('a.top-section').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

//	 Popup box
    var i;
    for (i = 1; i <= 30; i++) {
        //alert("jquery_popup"+i);
        $('.jquery_popup' + i).popup({
            content: $('#project' + i)
        });
    }

// Animated popup
    $('.animated_popup').popup({

        show: function ($popup, $back) {

            var plugin = this,
                center = plugin.getCenter();

            $popup
                .css({
                    top: -$popup.children().outerHeight(),
                    left: center.left,
                    opacity: 1
                })
                .animate({top: center.top}, 500, 'easeOutBack', function () {
                    // Call the open callback
                    plugin.o.afterOpen.call(plugin);
                });

        }
    });

// Call ALL the callbacks
    $('.callback_popup').popup({
        beforeOpen: function (type) {
            console.log('beforeOpen -', type);
        },
        afterOpen: function () {
            console.log('afterOpen');
        },
        beforeClose: function () {
            console.log('beforeClose');
        },
        afterClose: function () {
            console.log('afterClose');
        }
    });

    // Different preloader
    $('.preloader_popup').popup({
        preloaderContent: '<img src="./images/preloader.gif" class="preloader">'
    });

    // Error popup
    $('.error_popup').popup({
        error: function (content, type) {

            // Just call open again, it'll replace the content
            this.open('<h1>ERROR!</h1><p>Content "' + content + '" of type "' + type + '" could not be loaded.</p>', 'html');
        }
    });

    $('.fancybox').fancybox();
});

$(window).load(function () {
    $('.parallax').each(function () {
        var e = $(this);
        var value = e.attr("data-parallaxValue");
        e.parallax('50%', value ? value : 0.2);
    });
});

function scrollToNextModule() {
    scrollToModule($(this).parents('.module').first().nextAll('.module').first());
}
function scrollToModule(element) {
    if (!element) element = $('.module').first();
    $('html, body').animate({ scrollTop: element.offset().top - (($(window).height() / 2) - 250) }, 1000);
}
function scrollFromToModule(element){
	if(!element) element = $('.module').first();
    $('html, body').animate({ scrollTop: element.offset().top - (($(window).height() / 2) - 250) }, 1000);
}

// Email function
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function ValiDate() {
    var firma = $('#firma').val();
    var name = $('#name').val();
    var strasse = $('#strasse').val();
    var plz = $('#plz').val();
    var ort = $('#ort').val();
    var land = $('#land').val();
    var telefon = $('#telefon').val();
    var email = $('#email').val();

    var datenschutz = $('#datenschutz').attr('checked');

    var errormessage = '';
    /*
     if(name == ''){ errormessage = errormessage+'<p>Please enter your Fullname.</p>';
     $('#name').addClass('er');
     $('.error').fadeIn(1000);
     }
     else{$('#name').removeClass('er');}

     if(email == '' ){ errormessage = errormessage+'<p>Please enter your Email.</p>';
     $('#email').addClass('er');
     $('.error').fadeIn(1000);
     }
     else if(!IsEmail(email)){errormessage = errormessage+'<p>Please enter a valid Email.</p>';
     $('#email').addClass('er');
     $('.error').fadeIn(1000);
     }
     else{$('#email').removeClass('er');}

     if(textarea == ''){errormessage = errormessage+'<p>Please put some message.</p>';
     $('#textarea').addClass('er');
     $('.error').fadeIn(1000);
     }
     else{$('#textarea').removeClass('er');}
     */
    //Ajax colling
    if (datenschutz) {

        var dataString = 'firma=' + firma + '&name=' + name + '&strasse=' + strasse + '&plz=' + plz + '&ort=' + ort + '&land=' + land + '&telefon=' + telefon + '&email=' + email;

        $.ajax({
            type: "POST",
            url: "email.php",
            data: dataString,
            success: function (msg) {
                //$('.mailFromDiv').fadeOut(1000);

                $('#btn_senden').fadeOut(1500);
                $('#msg_send').fadeIn(1500);


            }
        });

    } else {
        alert("Bitte bestätigen Sie die Datenschutzhinweise!");
    }
}

$('#btn_senden').click(function () {

    ValiDate();


});
/*! Banner */
$(document).ready(function () {
    $status = $(".status");
    var options = {
        autoPlay: true,
        autoPlayDelay: 4000,
        pauseOnHover: false,
        hidePreloaderDelay: 500,
        nextButton: true,
        prevButton: true,
        pauseButton: true,
        preloader: true,
        hidePreloaderUsingCSS: false,
        animateStartingFrameIn: true,
        navigationSkipThreshold: 750,
        preventDelayWhenReversingAnimations: true,
        customKeyEvents: {
            80: "pause"
        }
    };
});