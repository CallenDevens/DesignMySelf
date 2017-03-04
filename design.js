$(document).ready(function(){
   var activeTemplate = 1;

   $('.color_selection').click(function(){
       var color = $(this).parent().next().val();
	   if(activeColorPart !=="" && activeTextPart !=undefined){
	       $('.'+activeColorPart).each(function(){
	           $(this).css({fill:color});
	       });
	   }
       
	   if(activeTextPart !==""&& activeTextPart !=undefined){
	       $('.'+activeTextPart).each(function(){
	           $(this).css({fill:color});
	       });
	   }
   });


   $('#edit_back').click(function(){
		$('.template_canvas').each(function(){
		   $(this).css({"display":"none"});
		});
		$('#template_'+activeTemplate+"_back").fadeIn("slow");
   });

   $('.show_back').click(function(){
		$('.template_canvas').each(function(){
		   $(this).css({"display":"none"});
		});
		$('#template_'+activeTemplate+"_back").fadeIn("slow");
   });


   $('#edit_front').click(function(){
		$('.template_canvas').each(function(){
		   $(this).css({"display":"none"});
		});
		$('#template_'+activeTemplate+"_front").fadeIn("slow");
   });

   
   /* show active template */
   $('.btn_pick_template').click(function(){
	   activeTemplate= $(this).parent().index()+1;
	   $('.template_canvas').each(function(){
		   $(this).css({"display":"none"});
		});
		$('#template_'+activeTemplate+"_front").fadeIn("slow");
	   
   });
   
   /* show active color picker*/
   var isColorPanelShow=false;
   var activeColorPart="";
   var length = $('.tab-content').css('width');
   $('.btn_pick_color').click(function(){
		if(!isColorPanelShow)
		{
		    $('#product_color_picker').animate({"left": "+="+length},"fast");
			isColorPanelShow=true;
		}
		var part = $(this).text().trim();
		$('#color_part').text(part + " COLOR");
		activeColorPart = part.toLowerCase().replace(" ","_");

   });

   /* show active text picker*/
   var isTextPanelShow=false;
   var activeTextPart="";
   $('.btn_edit_text').click(function(){
		if(!isTextPanelShow)
		{
		    $('#product_text_setter').animate({"left": "+="+length},"fast");
			isTextPanelShow=true;
		}
		var part = $(this).text().trim();
		$('#text_part').text(part + " TEXT");
		activeTextPart = part.toLowerCase().replace(" ","_");
   });
   
   
      /* show active text picker*/
   var isUploadPanelShow=false;
   var activeUploadPart="";
   $('.btn_upload_design').click(function(){
		if(!isUploadPanelShow)
		{
		    $('#logo_uploader').animate({"left": "+="+length},"fast");
			isUploadPanelShow=true;
		}
		var part = $(this).text().trim();
		$('#logo_part').text(part + " DESIGN");
		activeUploadPanelPart = part.toLowerCase().split(' ').join('_');
   });

   $('#font_list li').click(function(){
     var family=$(this).text();
	 console.log(family);

	 $('.'+activeTextPart).css({"font-family": family});
   });


   $('.btn_done').click(function(){
	   $(this).parent().animate({"left": "-="+length},"fast");
	   isColorPanelShow=false;
	   isTextPanelShow=false;
	   isUploadPanelShow=false;
	   activeColorPart="";
	   activeTextPart="";
	   activeUploadPanelPart="";
   });


   /* switch toggle tab menu */
   var activeIndex = -1;
   $('.tab_menu_item').click(function(){
        /* get index of clicked list item */
        var index =$(this).parent().index();
        if(activeIndex == index)
        {
		    /*pack up active sub_menu*/
            $('.tab_menu_item + div').eq(activeIndex).slideToggle("fast");

            /* reset index of active item to -1*/
			activeIndex = -1;

        }else{
          if(activeIndex>=0){

            $('.tab_menu_item + div').eq(activeIndex).slideToggle("fast");
		  }
            /*pack up active sub_menu*/
			$('.tab_menu_item + div').eq(index).slideToggle("fast");
			activeIndex = index;
        }

		/* close opening panel*/
		if(isColorPanelShow){
		    $('#product_color_picker').animate({"left": "-="+length},"fast");
			isColorPanelShow=false;
			activeColorPart="";
		}
		if(isTextPanelShow){
		    $('#product_text_setter').animate({"left": "-="+length},"fast");
			isTextPanelShow=false;
			activeTextPart="";
		}
		
		if(isUploadPanelShow){
		    $('#logo_uploader').animate({"left": "-="+length},"fast");
			isUploadPanelShow=false;
			activeUploadPanelPart="";
		}

   });

   $('#text_input').change(function(){
      $('.section_d.' + activeTextPart).text($(this).val());
   });
   
   
   
   
   
   
   $('#btn_upload_file').click(function(){
	   
	   $('#logo_file_front_left').trigger('click');
   });
   
   $('#logo_file_front_left').change(function(){
	       renderImage(this.files[0],"#logo_"+ activeUploadPanelPart);
	   
	   
   });
   
   
   function renderImage(file, logo_area) {
	   console.log(logo_area);
		var reader = new FileReader();
		reader.onload = function(event) {
    		the_url = event.target.result;
			var max_length = $(logo_area).css('width');
	    	$(logo_area).html("<img class='center-block' style='max-width:"+max_length+";  max-height:"+max_length+";' src='" + the_url + "' />");
		} 
		reader.readAsDataURL(file);
}
 

});