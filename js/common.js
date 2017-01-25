function setText( obj, text ) {
	
	if ( obj.textContent != undefined) {

		obj.textContent = text;

	}else if( obj.innerText != undefined){
        
        obj.innerText = text;

	}else{

       alert('浏览器不兼容');

	}
}