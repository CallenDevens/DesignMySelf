
$(document).ready(function(){		
   var activeTemplate = 1;
   var isEditShow=false;
   var activeEditableLogoPart = "";
   
	/* independent */
	$('.editable_item').click(function(){
		var id=$(this).text().toLowerCase();
		$('.editable_selection').css('display','none');
		$('#editable_'+id).css('display','block');
	});

   $('.color_selection').click(function(){
		var color = $(this).css('background-color');
	   if(activeColorPart !=="" && activeColorPart !=undefined){
	       $('#color-layer .'+activeColorPart).each(function(){
	           $(this).css({fill:color});
	       });
		   
		   $('#deco-layer .'+activeColorPart).each(function(){
	           $(this).css({fill:color});
	       });
	   }

	   if(activeDesignPart !==""&& activeDesignPart !=undefined){
	       $('#text_'+activeDesignPart).each(function(){
	           $(this).css({fill:color});
	       });
	   }
   });


   $('#edit_back,.show_back').click(function(){		
		var state = $('#template_'+activeTemplate+"_back").attr('display');
		if(state !== "block"){
				$('#template_'+activeTemplate+"_front").css({"display":"none"});
				$('#template_'+activeTemplate+"_back").fadeIn("slow");
		}
   });

   $('#edit_front,.show_front').click(function(){
		var state = $('#template_'+activeTemplate+"_front").attr('display');
		if(state !== "block"){
				$('#template_'+activeTemplate+"_back").css({"display":"none"});
				$('#template_'+activeTemplate+"_front").fadeIn("slow");
		}
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
		console.log(activeColorPart);

   });
   
   var isTextPanelShow=false;
   var activeTextPart="";

   $('.btn_edit_text').click(function(){
		if(!isTextPanelShow)
		{
		    $('#product_text_editor').animate({"left": "+="+length},"fast");
			isTextPanelShow=true;
		}
		var part = $(this).text().trim();
		activeTextPart = part.toLowerCase().replace(" ","_");
$('.clothes_text_input').css('display','none');
$('#'+activeTextPart+'_text_input').css('display','block');
   });

   var isDesignPanelShow=false;
   var activeDesignPart="";
   $('.btn_upload_design').click(function(){
	    var part = $(this).text().trim();
		$('#logo_part').text(part + " DESIGN");
		activeDesignPart = part.toLowerCase().split(' ').join('_');

		var svg_content= $('#lib_logo_'+activeDesignPart).html();
		$('#edit_canvas').html(svg_content);
		$('#edit_canvas svg').attr({'height':'150px','width':'150px','margin':'','display':''});

				
		if(!isDesignPanelShow)
		{
		    $('#logo_uploader').animate({"left": "+="+length},"fast");
			isDesignPanelShow=true;	
			
			var svgdesign = $('#lib_logo_'+activeDesignPart+ ' svg');
		    
			/*user has picked up logo fot the position */
			if(svgdesign.css('width') != undefined)
		    {
			    $('#logo_editor').animate({"left": "+=475px"},"fast");
			    isEditShow = true;
		    }
		}
		else
		{
			var svgdesign = $('#lib_logo_'+activeDesignPart+ ' svg');
			
			/*user has picked up logo for the position */
			if(svgdesign.css('width') != undefined)
			{
				if(!isEditShow)
				{
					$('#logo_editor').animate({"left": "+=475px"},"fast");
				    isEditShow = true;
				}

			}
			else{
				
				if(isEditShow)
				{
					$('#logo_editor').animate({"left": "-=475px"},"fast");
				    isEditShow = false;

				}
			}
		}
		
   });
   
  
   $('#font_list li').click(function(){
     var family=$(this).text();
	 $('#text_'+activeDesignPart).css({"font-family": family});
   });

//.btn_done, 
   $('.btn_close_panel').click(function(){
	   if(isColorPanelShow)
	   {
		   	$(this).parent().animate({"left": "-="+length},"fast");
			isColorPanelShow=false;
		    activeColorPart="";

	   }
	   if(isTextPanelShow)
	   {
		   	$(this).parent().animate({"left": "-="+length},"fast");
			isTextPanelShow=false;
		    activeTextPart="";

	   }
       if(isDesignPanelShow&&!isEditShow){
		     $(this).parent().animate({"left": "-="+length},"fast");
			  isDesignPanelShow=false;
			  activeDesignPart="";
	   }
	   if(isDesignPanelShow&&isEditShow)
	   {
		   	$('#logo_editor').animate({"left": "-=475px"},"fast");
		    isEditShow = false;
		    $('#logo_uploader').animate({"left": "-="+length},"fast");
		    isDesignPanelShow=false;
			activeDesignPart="";
	   }
   });
   
      $('.btn_done').click(function(){
	   if(isColorPanelShow)
	   {
		   	$(this).parent().animate({"left": "-="+length},"fast");
			isColorPanelShow=false;
		    activeColorPart="";

	   }
	   if(isTextPanelShow)
	   {
		   	$(this).parent().animate({"left": "-="+length},"fast");
			isTextPanelShow=false;
		    activeTextPart="";

	   }
	   if(isDesignPanelShow&&isEditShow)
	   {
		   	$('#logo_editor').animate({"left": "-=475px"},"fast");
		    isEditShow = false;
		    $('#logo_uploader').animate({"left": "-="+length},"fast");
		    isDesignPanelShow=false;
			activeDesignPart="";
	   }
   });
   
   $('.btn_remove_panel').click(function(){
	   	$('#logo_editor').animate({"left": "-=475px"},"fast");
	    isEditShow = false;
		removeActiveDesignLogo(); 
   });
  
    $('.btn_remove_upload').click(function(){
	   $('#logo_'+activeDesignPart).attr('xlink:href','');

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
		if(isTextPanelShow)
		{   
	        $('#product_text_editor').animate({"left": "-="+length},"fast");
			isTextPanelShow=false;
			activeTextPart="";			
		}			
		if(isDesignPanelShow){
			if(isEditShow){
				$('#logo_editor').animate({"left": "-=475px"},"fast");
				isEditShow = false;
			}
		    $('#logo_uploader').animate({"left": "-="+length},"fast");
			isDesignPanelShow=false;
			activeDesignPart="";
		}

   });

   $('.badge_text_input').on("keyup",function(){
	   $('#lib_logo_'+activeDesignPart+' svg #svg_editable_text').text($(this).val());
   });
   
   $('.clothes_text_input').on("keyup",function(){
	   $('#text_'+activeTextPart).text($(this).val());
   });
   
   
   $('#btn_upload_file').click(function(){
	   
	   $('#logo_file_front_left').trigger('click');
   });
   
   $('#logo_file_front_left').change(function(){
	   cleanDesignArea();
	   removeActiveDesignLogo(); 
	   renderImage(this.files[0],"#logo_"+activeDesignPart);
   });
   
   function cleanDesignArea(){
	   $('#logo_'+activeDesignPart).attr('xlink:href','');
   }
   
   function renderImage(file, logo_area) {
		var reader = new FileReader();
		reader.onload = function(event) {
    		the_url = event.target.result;
			var max_length = $(logo_area).css('width');
			console.log(max_length);			
			$(logo_area).attr('xlink:href',the_url);
		} 
		reader.readAsDataURL(file);
}
 
 
 
   $('.badge_type_item').click(function(){
	   var active_badge_selection = $(this).text().toLowerCase().split(' ').join('_');
	   $('.badge_display_area').css('display','none');
	   $('#badge_'+active_badge_selection).css('display','block');
	   $('#editable_part_menu').css('display','none');
   });
   
   $('#upload_bagde_item').click(function(){
	   if(isEditShow)
	   {
		  $('#logo_editor').animate({"left": "-=475px"},"fast");
        isEditShow = false;

	   }
   });
   
   $('#editable_bagde_item').click(function(){
	   	   $('#editable_part_menu').css('display','block');

   });
   
   
   /* show hinted lines*/
   var hover_part="";
   $('.btn_pick_color').hover(
    	function() {
			hover_part = $(this).text().trim().toLowerCase().replace(" ","_");
    		$('#line-layer .'+hover_part).css('stroke','#f0f8ff');
    	}, 
    	function() {
    		$('#line-layer .'+hover_part).css('stroke','none');
    	}
	);
	
	$('.btn_upload_design,.btn_edit_text').hover(
		function(){
			hover_part = $(this).text().trim().toLowerCase().split(' ').join('_');
			$('#frame_'+hover_part).css('stroke','#f0f8ff');
		},
		function(){
			$('#frame_'+hover_part).css('stroke','none');
		}
	);
	
	$('.btn_reset').click(function(){
		cleanDesignArea();
	});
	
	
    function switchEditablePanel(){
         if(!isEditShow)
        {
        	$('#logo_editor').animate({"left": "+=475px"},"fast");
        	isEditShow = true;
        }else{
        	$('#logo_editor').animate({"left": "-=475px"},"fast");
        	isEditShow = false;
        }
    }
	
	function removeActiveDesignLogo(){
  	    var logo_pos = $('#lib_logo_'+activeDesignPart);
		logo_pos.html('');
		$('#edit_canvas').html('');	 
	}
});

