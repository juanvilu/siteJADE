		/*
            Funciones especiales de comportamiento click en links.
        */
            $.ajaxSetup({
                beforeSend: function (XHR) {
                    if(XHR.overrideMimeType)
                        XHR.overrideMimeType ('application / x-www-form-urlencoded; charset = utf-8');
                },
                scriptCharset: "utf-8"
            });
            var settings = {
                    mensajeEspera  : "Cargando Pagina...",
        			stringSpped : "slow",
                    mensajeNoURL    : "Se requiere el dato href"

                };
           //---------------------------------------
           var methods = {
                    init:   function(options){
                                $.extend( settings,options||{} );
                                //---------------------------------------
                                return this.each(function(){
                                    $(this).on('click',function(e){
                                        e.preventDefault();
                                       	var me      = $(this),
		                                    parent  = me.parent('li'),
		                                    link    = me.attr('href'),
		                                    destino = me.attr('destino'),
		                                    relacion= me.attr('rel');

		                                if(!link || link == '#')
		                                    return false;
		                                if( !destino && ( !relacion || relacion ) )
		                                	return false;

		                                me.closest('ul').children().removeClass('active');
		                                $(parent).addClass('active');
                                        $(destino).slideUp(settings.stringSpped,function(){
                                            $(destino).load( link, function(){
                                                $(destino).slideDown(settings.stringSpped);
                                            });
                                        });
                                        return false;
                                    });
                                });
                            }
            };
            //---------------------------------------
            $.fn.clickeable = function( method ) {
                // Method calling logic
                if ( methods[method] ) {
                    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
                } else if ( typeof method === 'object' || ! method ) {
                    return methods.init.apply( this, arguments );
                } else {
                    $.error( 'Method ' +  method + ' does not exist on jQuery.clickElemGES' );
                }
            };