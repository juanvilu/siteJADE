	
	function magicLoadLib(options){
	    var settings = $.extend({lib:'',type:'js',run:null},options),
	    	str = settings.lib, pos = str.search(/s/i),head,elemento;
	    
	    str = str.split('/');
	    
	    if(document.getElementById(str))
	    	return false;
	    
	    head    = document.getElementsByTagName('head')[0];
	    if(settings.type != "undefined" && settings.type.toLowerCase() == 'css'){	    
	    	elemento  = document.createElement('link');	    	
	    	elemento.href= settings.lib;
	    }else{
	    	elemento  = document.createElement('script');
	    	elemento.type = 'text/javascript';
	    	elemento.src= settings.lib;
	    	if(!settings.run=="undefined"){
				script.onreadystatechange= function () {
		      		if (this.readyState == 'complete') settings.run();
		    	}
		    	elemento.onload= settings.run;	
		    }
	    }
	    elemento.id   = str[pos];		                               	   	  
	    head.appendChild(elemento);
	}
