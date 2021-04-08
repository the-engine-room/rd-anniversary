var RDA = {

  init: function() {
    this.popContent();
  },

  popContent: function(){
    $('.s, .d').click(function(e){
      $('.popcontent').addClass('hide');
      $(this).next('.popcontent').removeClass('hide');
    });
    $('.popcontent .right .close').click(function(e){
      $(this).parent().parent('.popcontent').addClass('hide');
    });
  }

}



$(document).ready(function(){
  RDA.init();
  $('.popcontent-text').mCustomScrollbar();
  $('.timeline').mCustomScrollbar();
});
