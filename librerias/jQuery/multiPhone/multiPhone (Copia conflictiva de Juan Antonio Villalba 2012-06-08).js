    /*
    *   @autor:         Juan Antonio Villalba Luna
    *   @Copy right:    2011
    *   @Fecha:         28/Abril/2011
    *   Plugin multiPhone V1.0 beta
    *   Como usuar el plugin:   $(selector).multiPhone();           //Por default usa fast 
    *                           $(selector).multiPhone('fast');
    *                           $(selector).multiPhone('slow');
    *   28/Abril/2011:          V2.0 Agregar propiedades como las etiquetas, y item inicial de la lista
    *                           asi como multi selector, array/objeto, para utilizar solo un llamado del plugin y
                                aplicarlo a varios controles multiphone
    *   4/Mayo/2011:            V2.5 Agregar metodos como seleccionar, desplazar( < sentido > ) <sentido> = 'U' || 'D'
        
    
    $('#btnUp').bind('click',function(){                                                                                                      
        if ( parseInt($('#lstPhone').css('top'),10) == -46)
            return false;                                        
                            
       vtop =  parseInt($('#lstPhone').css('top'),10) -   23 ;                                  
       $('#lstPhone').animate( {top: vtop }, 'fast');        
       //$('#'+ Math.abs( vtop/23 )).css( 'border','solid blue 1px' ) ; Podre agregar el atributo name paraser prosedao en el submit                   
    });
    
    $('#btnDown').bind('click',function(){                    
        //parseInt($('#lstPhone').css('top'),10);                                                                                                                         
        
        if ( parseInt($('#lstPhone').css('top'),10) == 0)
            return false;    
        vtop =  parseInt($('#lstPhone').css('top'),10) +   23 ;                                 
        $('#lstPhone').animate( {top: vtop }, 'fast');        
    });
    
    $('.itemPhoneSelected').bind('click',function(){
        
        inputId = $(this).siblings('input').attr('id');                     
        if( $(this).hasClass('selected') )
            $(this).siblings('input').removeAttr('name');
        else
            $(this).siblings('input').attr('name',inputId);    
                                
        $(this).toggleClass('selected');
            
    });
                          
    //Pendiente revision $.multiPhone - $(selector).multiPhone        
    (function($){
        $.multiPhone=function(settings){
            var vtop = 0, inputId, selector=this;
            
            var config = {                            
                duration: 'fast'
            };
            
            if( settings ){ $.extend( settings, config ) }
            
            var listaTelefonos = $(selector), children = listaTelefonos.children('input[type=text]');                        
            var etiqueta='',id = '',estructuraBtn="";                                                
            
            listaTelefonos.wrap('<div class="wrapMultiPhone"></div>');  //Wrap principal Relativo
            
            children.wrap('<div style="float: left;"></div>');          //Wrpa para cada input
                                                            
            $.each(children ,function(indice,elemento){                 //Estructura de los telefonos
                etiqueta = $(elemento).attr('title');
                id = $(elemento).attr('id');
                $(elemento).parent().attr('id','tel'+id);
                $(elemento).parent().prepend('<div id="chk'+ id +' " class="itemPhoneSelected"></div>').prepend('<span>Tel. '+ etiqueta +' </span>');                                                            
            } );
            
            estructuraBtn='<div style="position: absolute; width: 16px;height: 20px;left: 92.5%;">';
            estructuraBtn+='<div class="btnUp btnSelection"></div>';
            estructuraBtn+='<div class="btnDown btnSelection"></div>';
            estructuraBtn+='</div>';                    
            
            listaTelefonos.after(estructuraBtn);                        //Agrega la estructura al dom
            // Agregando eventos en los botones de navegacion 
            listaTelefonos.siblings().children('.btnUp').bind('click',function(){                        
            if ( parseInt(listaTelefonos.css('top'),10) == -46)
                return false;                                        
                                
           vtop =  parseInt(listaTelefonos.css('top'),10) -   23 ;                                  
          listaTelefonos.animate( {top: vtop }, 'fast');        
           //$('#'+ Math.abs( vtop/23 )).css( 'border','solid blue 1px' ) ; Podre agregar el atributo name paraser prosedao en el submit                   
        });
        
        listaTelefonos.siblings().children('.btnDown').bind('click',function(){                    
            //parseInt($('#lstPhone').css('top'),10);                                                                                                                         
            
            if ( parseInt(listaTelefonos.css('top'),10) == 0)
                return false;    
            vtop =  parseInt(listaTelefonos.css('top'),10) +   23 ;                                 
            listaTelefonos.animate( {top: vtop }, 'fast');        
        });
            //Agregando eventos en los botones de navegacion 
            
            $('.itemPhoneSelected').bind('click',function(){
        
                inputId = $(this).siblings('input').attr('id');                     
                if( $(this).hasClass('selected') )
                    $(this).siblings('input').removeAttr('name');
                else
                    $(this).siblings('input').attr('name',inputId);    
                                        
                $(this).toggleClass('selected');
                    
            });                                                
                                   
            
        }   
    })(jQuery);
    
    //Estructura html generada
    
    Código prototipo usado de plantilla inicial
        
        <div id="wrapMultiPhone" class="wrapMultiPhone">
            <div id="lstPhone" class="listPhone">
                <div id="0" style="float: left;">                        
                    <div id="chkCasa" class="itemPhoneSelected"></div>
                    <span>Tel. Casa </span><input type="text" id="phoneCasa" title="Casa"/>
                </div>                                       
                <div id="1" style="float: left;">
                    <div id="chkCelular" class="itemPhoneSelected"></div>
                    <span>Tel. Celular </span><input type="text" id="phoneCelular" title="Celular"/>
                </div>
                <div id="2" style="float: left;">
                    <div id="chkOficina" class="itemPhoneSelected"></div>
                    <span>Tel. Oficina </span><input type="text" id="phoneOficina" title="Oficina"/>
                </div> 
            </div>
            <div id="selectPhone" style="position: absolute; width: 16px;height: 20px;left: 92.5%;">
                <div id="btnUp" class="btnSelection"></div>
                <div id="btnDown" class="btnSelection"></div>
            </div>
        </div>                    
    */    
    
    jQuery.fn.multiPhone=function(settings){
        var vtop = 0, inputId, selector= this;
        var inAnimation = false; //Agregada el 19/Mayo/2011
                    
        var config = {                            
            duration: 'fast'
        };
        
        if( settings ){ $.extend( config, settings ) }
                                                                
        var listaTelefonos = $(selector), children = listaTelefonos.children('input[type=text]');                        
        var etiqueta='',id = '',estructuraBtn="",w;                              
        /**/                      
        listaTelefonos.addClass('listPhone');
        listaTelefonos.wrap('<div class="wrapMultiPhone ui-corner-all"></div>');            
        w=$(listaTelefonos).parent('div.wrapMultiPhone').wrap('<p></p>');                        
        listaTelefonos.find('label').insertBefore($(w));                                       
        /**/        
                                                                                                                  
        //children.wrap('<div style="float: left;"></div>');          //Wrap para cada input
        children.wrap('<span style="float: left;"></span>');
                                                        
        $.each(children ,function(indice,elemento){                 //Generando la estructura de los telefonos
            etiqueta = $(elemento).attr('title');
            id = $(elemento).attr('id');
            $(elemento).parent().attr('id','tel'+id);
            //$(elemento).parent().prepend('<div id="chk'+ id +'" class="itemPhoneSelected"></div>').prepend('<span>Tel. '+ etiqueta +' </span>');                                                            
            $(elemento).parent().prepend('<span id="chk'+ id +'" class="itemPhoneSelected"></span>').prepend('<span>Tel. '+ etiqueta +' </span>');
        } );
        
        //Estructura de los botones de navegacion
        estructuraBtn= '<div class="wrapBtns" style="position: absolute; width: 16px;height: 20px;left: 92.5%;">';
        estructuraBtn+='<div class="btnUp btnSelection" title="Subir"></div>';
        estructuraBtn+='<div class="btnDown btnSelection title="Bajar"></div>';
        estructuraBtn+='</div>';                    
                       
        listaTelefonos.after(estructuraBtn);                        //Agrega la estructura al dom
        
        // Agregando eventos en los botones de navegacion                                                       
        // 28/Abril/2011:   Cambiar la constante 23, y -46 por el alto del input y el alto del wrap lista de telefonos                   
        listaTelefonos.siblings().children('.btnUp').bind('click',function(){                                    
            if( inAnimation ) return false;
            else inAnimation = true;
                       
            if ( parseInt(listaTelefonos.css('top'),10) == - (2*parseInt(parseInt(listaTelefonos.css('height'),10)/3))  )//parseInt(listaTelefonos.css('height'),10) - parseInt (parseFloat(listaTelefonos.css('height'),10)/3)  )
                return (inAnimation=false);                                        
                                
            vtop =  parseInt(listaTelefonos.css('top'),10) -  parseFloat(parseInt(listaTelefonos.css('height'),10)/3) ;                                  
            listaTelefonos.animate( {top: vtop }, config.duration,function(){
                inAnimation = false;
            });                                      
        });
        
        listaTelefonos.siblings().children('.btnDown').bind('click',function(){                    
            //parseInt($('#lstPhone').css('top'),10);                                                                                                                                    
            if( inAnimation ) return false;
            else inAnimation = true;
            
            if ( parseInt(listaTelefonos.css('top'),10) == 0)
                return (inAnimation=false);  
                  
            vtop =  parseInt(listaTelefonos.css('top'),10) +   parseInt(parseInt(listaTelefonos.css('height'),10)/3) ;                                 
            listaTelefonos.animate( {top: vtop }, config.duration,function(){
                inAnimation = false;   
            });        
        });
        //Agregando eventos en los botones de navegacion 
        
        listaTelefonos.children().children('.itemPhoneSelected').bind('click',function(){
    
            inputId = $(this).siblings('input').attr('id');                     
            if( $(this).hasClass('selected') )
                $(this).siblings('input').removeAttr('name');
            else
                $(this).siblings('input').attr('name',inputId);    
                                    
            $(this).toggleClass('selected');
                
        });
    }  /**/