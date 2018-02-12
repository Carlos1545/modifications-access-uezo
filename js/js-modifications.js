function input_modify(){
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}

		// events:
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );

	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input--filled' );
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input--filled' );
		}
	}
}
window.onload = input_modify;

function somente_numero(campo){
	var digits="0123456789"
	var campo_temp
	for (var i=0;i<campo.value.length;i++){
	  campo_temp=campo.value.substring(i,i+1)   
	  if (digits.indexOf(campo_temp)==-1){
			campo.value = campo.value.substring(0,i);
			break;
	   }
	}
}
function mask(o, f) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g,"");
    r = r.replace(/^0/,"");
    if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/,"(0$1) $2-$3");
    }
    else if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"(0$1) $2-$3");
    }
    else if (r.length > 2) {
        // 3..5 digits. Add (0..)
        r = r.replace(/^(\d\d)(\d{0,5})/,"(0$1) $2");
    }
    else {
        // 0..2 digits. Just add (0
        r = r.replace(/^(\d*)/, "(0$1");
    }
    return r;
}
function mask_cpf(o, f) {
	setTimeout(function () {
        var v = mcpf(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}
function mcpf(v) {
    var r = v.replace(/\D/g,"");
    r = r.replace(/^0/,"");
    if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,"$1.$2.$3-$4");
    }
	else if (r.length > 8) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d{3})(\d{3})(\d{3})/,"$1.$2.$3-");
    }
    else if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d{3})(\d{3})/,"$1.$2.");
    }
    else if (r.length > 2) {
        // 3..5 digits. Add (0..)
        r = r.replace(/^(\d{3})/,"$1.");
    }
    return r;
}