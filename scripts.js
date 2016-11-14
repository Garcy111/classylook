$.fn.mytoggle = function() {
  var b = arguments;
  return this.each(function(i, el) {
    var a = function() {
        var c = 0;
        return function() {
            b[c++ % b.length].apply(el, arguments)
        }
    }();
    $(el).click(a)
  })
};

$(document).ready(function(){

	$(document).foundation();


	/* SLIDERS */

	$('.main-slider').owlCarousel({
    autoPlay: true,
    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true
  });

  $('.action-slider').owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true
  });

  $('.look-slider').owlCarousel({
    navigationText : ["",""],
    itemsCustom : [
      [0, 2],
      [770, 4]
    ],
    pagination : false,
    navigation : true
  });

  $('.viewed-slider').owlCarousel({
    navigationText : ["",""],
    itemsCustom : [
      [0, 2],
      [600, 3],
      [1000, 4]
    ],
    pagination : false,
    navigation : true
  });

  $('.company-slider').owlCarousel({
    navigationText : ["",""],
    itemsCustom : [
      [0, 2],
      [600, 3],
      [1000, 4]
    ],
    pagination : false,
    navigation : true
  });

  $('.single-slider').owlCarousel({
    navigationText : ["",""],
    itemsCustom : [
      [0, 2],
      [600, 3],
      [1000, 3]
    ],
    pagination : false,
    navigation : true
  });

  $('.single-colors a').click(function(){
  	$(this).addClass('active').siblings().removeClass('active');
    var color = $(this).data("color");
    var sizes = $(this).data("size");
    if( sizes.indexOf(',')){
        //sizes.split(',');
    }
      console.log( sizes.indexOf(',') );
    $("span.color").html( color );
      //$('option[value="'+val+'"]
  	return false;
  });
  $("#sizes").change(function(){
     var size = $(this).val().replace ('/', '');
     $(".size").html( size );
  })

  $('.single-char-title[data-toggle]').click(function(){
  	$(this).toggleClass('opened');
  })



	/* valid */

	valid = function(frm) {
		$('.required',frm).removeClass('signal');
		var fld = $('.required',frm).filter(function() { return !this.value; });
		if(fld.length==0) return true;
		else {
			for(i=0; i<fld.length; i++) $(fld[i]).addClass('signal');
			$(fld[0]).focus();
			return false;
		}
	}
	$('.popup .close, .fade').click(function(){
		$('.fade, .popup-error, .popup-confirm').hide(); $('.popup').fadeOut(200);
	});
	$(document).keyup(function(e) {	if (e.keyCode == 27) $('.fade').click(); });
	$('.poplink').click(function(){
		$('.fade').show();
		$($(this).attr('href')).fadeIn(200);
		return false;
	});
	$('.form').prepend('<div class="popup-error" /><div class="popup-confirm" />');
	$('.sendform').click(function(){
		var formLay = $(this).parents('form');
		$('.popup-error, .popup-confirm').hide();
		if(valid(formLay)) {
			$.ajax({
				type: "POST",
				url: "/ajaxmail.php",
				data: $(formLay).serializeArray(),
				success: function(back) {
					if(back!='error') {
						$('.popup-confirm',formLay).text(back).slideDown(200);
					}
					else $('.popup-error',formLay).text(back).slideDown(200);
				},
				error: function() {
					$('.popup-error',formLay).text('Ошибка отправки! Попробуйте ещё раз').slideDown(200);
				}
			});
		}
		else $('.popup-error',formLay).text('Некоторые данные не введены или введены неверно.').slideDown(200);
		return false;
	});

  $('.wishlist .prods-item').hover(function() {
    $(this).css({
      border: '1px solid #e1e1e1',
      borderBottom: 'none'
    });
    $(this).find('.popup-prod').show();
  }, function() {
    $(this).css({
      border: '1px solid #fff',
      borderBottom: 'none'
    });
    $(this).find('.popup-prod').hide();
  });

  // Login
  $('#sign-in-form, #login-form').find('input').focus(function() {
    $(this).addClass('valid-input');
  });

  // Prods imgs
  $('.prods-item .prods-img').show();
  $('.viewed').show();

  // $('.prods-colors').find('.color:first').addClass('selected_color');

  $('.prods-colors').find('.color').click(function() {

  	var prodsColors = $(this).parent();
  	var prodImgs = $(this).parent().parent().find('.prods-img img');

    var prodCart = $(this).parent().parent().find('.prods-tocart');
    var cartUrl = new Url( prodCart.attr("href") );
        cartUrl.query.id = $(this).attr('data-id');
        prodCart.attr( "href", cartUrl );

  	prodsColors.find('.color').removeClass('selected_color');
  	$(this).addClass('selected_color');
  	var prodId = $(this).attr('data-id');


  	window.prodId = prodId;

  	$.each(prodImgs, function(i, elem) {
  		$(elem).hide();
  		if (window.prodId == $(elem).attr('data-id')) {
  			$(elem).show();
  		}
  	});


  });

  $('.cat-sort').mytoggle(function() {
    $('.cat-sort-list').show();
  }, function() {
    $('.cat-sort-list').hide();
  });

  $('.pur_head_tr').mytoggle(function() {
    var id = $(this).attr('data-id');
    $('.id_' + id).show();
    $(this).addClass('pur_head_tr-active');
    $(this).find('.pur_arrow').css({transform: 'rotate(90deg)'});
  }, function() {
    var id = $(this).attr('data-id');
    $('.id_' + id).hide();
    $(this).removeClass('pur_head_tr-active');
    $(this).find('.pur_arrow').css({transform: 'rotate(0deg)'});
  });

  $('.save_personal_data').click(function(e) {
    e.preventDefault();
    window.error_required_field = true;
    $('#personal-data-form').find('input').each(function(i, el) {
      if ($(this).hasClass('required_field')) {
        if ($(this).val() == '') {
          error_required_field = false;
          $(this).css({border: "1px solid #E80C20"});
          $('.pers_error').show();
        } else {
          $(this).css({border: "1px solid #e1e1e1"});
        }
      }
    });
    if (error_required_field) {
      $('.pers_error').hide();
      $('#personal-data-form').submit();
    }
  });

  $('.buy-obraz-single').fancybox();

  $("a.full-photo").fancybox({
    overlayOpacity: 0.7,
    overlayColor: '#000',
    padding: 0
  });

  $('.buy-obraz-single').click(function() {
    var src = $('#buy-obraz-modal .single-images-other').find('img').attr('src');
    $('#buy-obraz-modal .single-poster').find('img').attr('src', src);
  });

  $('#buy-obraz-modal .single-images-other').find('img').click(function() {
    $('#buy-obraz-modal .single-images-other img').removeClass('active_prod');
    $(this).addClass('active_prod');
    var src = $(this).attr('src');
    var dataProductId = $(this).attr('data-product-id');
    $('#buy-obraz-modal .single-desc').hide();
    $('#product_' + dataProductId).show();
    $('#buy-obraz-modal .single-poster').find('img').attr('src', src);
  });

  $('#single-images .single-images-other').find('img').click(function() {
    $('#single-images .single-images-other img').removeClass('active_prod');
    $(this).addClass('active_prod');
    var src = $(this).attr('src');
    $('#single-images .full-photo').attr('href', src);
    $('#single-images .single-poster').find('img').attr('src', src);
  });

  setTimeout(function(){
    var firstImg = $('#single-images .single-images-other').find('img:first');
    firstImg.addClass('active_prod');
    var startSrc = firstImg.attr('src');
    $('#single-images .full-photo').attr('href', startSrc);
    $('#single-images .single-poster').find('img').attr('src', startSrc);
  }, 1000);

  // AddReviews
  $('.add-review').find('.rate-star').click(function() {
    var stars = $('.add-review .rate-star');
    stars.removeClass('rate-star-on');
    var star = $(this).attr('data-star');
    for (var i=0; star > i; i++) {
      $(stars[i]).addClass('rate-star-on');
    }
    $('#rate').val(star);
  });

  $('.carou-slider').show();

  // Index sliders
  $('#decorations-slider, #bags-slider').hide();
  $('.category-slider').click(function() {
    var slider = $(this).attr('data-catslider');
    $('#clothing-slider, #decorations-slider, #bags-slider').hide();
    $('#' + slider).show();
    $('.categories-sliders').find('.category-slider').removeClass('active-slider');
    $(this).addClass('active-slider');
  });

  $('.eye-pass').mytoggle(function() {
    $(this).parent().find('input').attr('type', 'text');
  }, function() {
    $(this).parent().find('input').attr('type', 'password');
  });

  // $('.slide-down-elem').mytoggle(function(e) {
  //   e.preventDefault();
  //   $(this).parent().find('ul').show();
  // }, function(e) {
  //   e.preventDefault();
  //   $(this).parent().find('ul').hide();
  // });

  $('.color-select').find('option').click(function() {
    alert(1);
    var color = $(this).attr('value');
    $('.color-selected').addClass(color);
  });

  $('.subscribe-form').find('button').click(function(e) {
    e.preventDefault();
    var email = $(this).parent().find('input').val();
    if (email.length > 1) {
      $(this).parent().find('input').css({border: '1px solid #e1e1e1'});
      $(this).hide();
      $('.thank-button').show();
    } else {
      $(this).parent().find('input').css({border: '1px solid #FF0000'});
    }
  });

  $('.mainmenu .top_elem').mouseover(function() {
    $('.sub_mainmenu').removeClass('visable');
    $(this).parent().find('.sub_mainmenu').addClass('visable');
  });

  $('.sub_mainmenu').mouseleave(function() {
    $(this).removeClass('visable');
  });

  // Vertical sliders for single page
  function slidePreview(start, end, imgs, length) {
    imgs.hide();
    for (start; start <= end; start++) {
      $(imgs[start]).show();
    }
  }

  var imgs = $('#buy-obraz-modal .single-images-other img');
  var start = 0;
  var end = 2;
  var length = imgs.length - 1;
  
  slidePreview(start, end, imgs);

  $('#buy-obraz-modal .next_slide').click(function() {
    if (length > end) {
      start++;
      end++;
      slidePreview(start, end, imgs, length);
    } else {
      start = 0;
      end = 2;
      slidePreview(start, end, imgs, length);
    }
  });

  var imgsSingle = $('#single-images .single-images-other img');
  var startSingle = 0;
  var endSingle = 2;
  var lengthSingle = imgsSingle.length - 1;
  
  slidePreview(startSingle, endSingle, imgsSingle);

  $('#single-images .next_slide').click(function() {
    if (lengthSingle > endSingle) {
      startSingle++;
      endSingle++;
      slidePreview(startSingle, endSingle, imgsSingle, lengthSingle);
    } else {
      startSingle = 0;
      endSingle = 2;
      slidePreview(startSingle, endSingle, imgsSingle, lengthSingle);
    }
  });

});