$(function(){

   $('.btn-fold-menu').on('click',function(){
   	   $(this).toggleClass('retract');
       $('.container').toggleClass('isShowSidebar');
   });

   $('.menu-list dd').on('click',function(){
   	  $(this).toggleClass('act');
   });
   $('.menu-lv3').on('click',function(){
   	  $(this).toggleClass('act');
   });


   



});