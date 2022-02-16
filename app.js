$(window).scroll(()  => {
  if ($(this).scrollTop() >= 5){
    $('.navbar').addClass('sticky')
  } else if ($(this).scrollTop() < 5) {
    $('.navbar').removeClass('sticky')
  }
})

$('.menu-btn').click(() => {
  $('.navbar .menu').toggleClass('active');
})
