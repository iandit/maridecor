let resized = false;

$(window).resize(function(event) {
    let ww = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (resized == ww) { return; }
    resized = ww;
    // console.log();

    replaceIcon(ww);
});


function replaceIcon(ww) {
    if (ww < 992) {
        // console.log("isMobile of class");
        $('.header__action').find('a').removeClass('btn');
        $('.header__action').find('i').addClass('gradient_icon');

    } else {
        // console.log('isDesctop on class');
        $('.header__action').find('a').addClass('btn');
        $('.header__action').find('i').removeClass('gradient_icon');
    }
}
replaceIcon($(window).width());


var swiperSlider = $('.swiper');
swiperSlider.each(function() {
    var options = $(this).data('options') || {},
        $parent = $(this).parent(),
        swiperDefaults = {

            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            // slidesPerGroup: 4,
            breakpoints: {
                 481: {
                   slidesPerView: 2,
                   spaceBetween: 20,
                 },
                 768: {
                   slidesPerView: 3,
                   spaceBetween: 30,
                 },
                 1024: {
                   slidesPerGroup: 4,
                   slidesPerView: 4,
                   spaceBetween: 30,
                 },
             },

            // If we need pagination
            pagination: {
                el: $parent.find('.section__pagination')[0],
                type: 'fraction',
            },

            // Navigation arrows
            navigation: {
              nextEl: $parent.find('.sliderNav_right')[0],
              prevEl: $parent.find('.sliderNav_left')[0],
            },

        };

    var swiperOptions = $.extend(swiperDefaults, options),
        mySwiper = new Swiper(this, swiperOptions);
});

// swiper
// var mySwiper = new Swiper('.swiper', {
//   // Optional parameters
//   // direction: 'vertical',
//   loop: true,
//   slidesPerView: 1,
//   spaceBetween: 30,
//   // slidesPerGroup: 4,
//   breakpoints: {
//        481: {
//          slidesPerView: 2,
//          spaceBetween: 20,
//        },
//        768: {
//          slidesPerView: 3,
//          spaceBetween: 30,
//        },
//        1024: {
//          slidesPerGroup: 4,
//          slidesPerView: 4,
//          spaceBetween: 30,
//        },
//    },
//
//   // If we need pagination
//   pagination: {
//       el: '.section__pagination',
//       type: 'fraction',
//   },
//
//   // Navigation arrows
//   navigation: {
//     nextEl: '.sliderNav_right',
//     prevEl: '.sliderNav_left',
//   },
//
// })


// ФОРМА
function submitForm() {
    let modal = $('#info');
    let message = modal.find('.form__message');
        // при закрытии окна, чистим
    modal.on('hidden.bs.modal', function (e) {
    message.html('');
});
    // проверка клавиши enter
    $("[type=submit]").keyup(function(event){
        if(event.keyCode == 13){
            $(this).click();
        }
    });

    $('[type=submit]').on('click tab', function (e) {
        //отменяем стандартную обработку нажатия по кнопке запрет на отправку
        e.preventDefault();

        // записуем объект относящийся к ЭТОЙ кнопке
        let form = $(this).closest('.form');

        // Поиск потомков внутри каждого элемента в текущем наборе ОБЯЗАТЕЛЬНЫЕ ПОЛЯ!!!
        let fields = form.find('[required]');

        // Записываем значение атрибута формы action
        let url = form.attr('action');

        // Записываем значения полей форм. Обязателен атрибут name у полей с уникальным значением
        let formData = form.serialize();

        // проверка спама
        let notspam = form.find('[name="notspam"]');
        notspam.val('Not spam');

        let empty = 0;

        // выполняет функцию для каждого элемента
        fields.each(function (index, el) {
            // проверка заполнения полей
            if ($(this).val() === '') {
                $(this).addClass('invalid');
                empty++;
            } else {
                $(this).removeClass('invalid');
            }
        });
        // console.log(empty);
        if (empty === 0) {
            // $('.form').submit();
            $.ajax({
                url:url,
                type: "POST",
                dataType: "html",
                data: formData,
                success: function (responce) {
                    // $('#success').modal('show');
                    console.log('success');
                    modal.modal('show');
                    message.html('Ваше сообщение отправлено. <br> Мы свяжемся с вами в ближайшее время.');
                    },
                    error: function (responce) {
                        console.log('error');
                        modal.modal('show');
                        message.html('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                        }
                    })
                }
            });
}
submitForm();

$('.tabs__item').on('click', function() {
    $('.tabs__item').removeClass('active');
    $(this).addClass('active');

    $('.tabContent__item').removeClass('active');
    $($(this).data('tab')).addClass('active');
})
