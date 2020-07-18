var General;
(function (General) {
    /**
     * Valida que el dato sea de tipo string y con longitud de 3 caracteres minimo
     * @param {*} string
     */
    function validString(string) {
        var value = true;
        var pattern = RegExp("^[A-Za-z0-9 \u00E0-\u00FC]+$");
        var tmpString = string.trim();
        if (tmpString.length == 0) {
            alert("El campo no puede estar vacio.");
            value = false;
        }
        if (!pattern.test(string)) {
            alert("Solo se permiten letras y numeros (Sin simbolos).");
            value = false;
        }
        else if (string.length < 1) {
            alert("El campo debe contener 1 caracter como minimo.");
            value = false;
        }
        return value;
    }
    General.validString = validString;
    /**
     * Valida que el campo 'Precio' no este vacio
     * @param {*} age
     */
    function validPrice(price) {
        var value = true;
        if (price.length == 0) {
            alert("Debe ingresar un precio.");
            value = false;
        }
        return value;
    }
    General.validPrice = validPrice;
})(General || (General = {}));
