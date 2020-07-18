var General;
(function (General) {
    // variable para almacenar el dato de la fila seleccionada
    var trClick;
    // Lista de vehiculos
    var listaVehiculos = new Array();
    // variables para manejar los datos del formulario con el DOM
    var inputMarca = document.getElementById('marca');
    var inputModelo = document.getElementById('modelo');
    var inputPrecio = document.getElementById('precio');
    var inputTipo = document.getElementById('tipo-vehiculos');
    var inputPuertas = document.getElementById('puertas');
    var input4x4 = document.getElementById('cuatro-x-cuatro');
    window.addEventListener('load', hideForm);
    /**
     * Crea una fila con la variable pasada por parametro
     * @param {*} jsonObject
     */
    function newRow(jsonObject) {
        var newRow = document.createElement('tr');
        // Agrego el id
        var newCellId = document.createElement('td');
        var textNodeId = document.createTextNode(jsonObject.id);
        newCellId.appendChild(textNodeId);
        newRow.appendChild(newCellId);
        // Agrego la marca
        var newCellMarca = document.createElement('td');
        var textNodeMarca = document.createTextNode(jsonObject.marca);
        newCellMarca.appendChild(textNodeMarca);
        newRow.appendChild(newCellMarca);
        // Agrego el modelo
        var newCellModelo = document.createElement('td');
        var textNodeModelo = document.createTextNode(jsonObject.modelo);
        newCellModelo.appendChild(textNodeModelo);
        newRow.appendChild(newCellModelo);
        // Agrego el precio
        var newCellPrecio = document.createElement('td');
        var textNodePrecio = document.createTextNode(jsonObject.precio);
        newCellPrecio.appendChild(textNodePrecio);
        newRow.appendChild(newCellPrecio);
        //Agrego la accion
        var newCellAccion = document.createElement('td');
        var newButton = document.createElement('button');
        newCellAccion.appendChild(newButton).value = "Accion";
        newRow.appendChild(newCellAccion);
        // Evento doble click, llamo a la funcion 'clicRow'
        //newRow.addEventListener('click', clickRow);
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }
    General.newRow = newRow;
    /**
    * Recorre los datos del objeto JSON para ir formando la tabla
    * @param {*} jsonObject
    */
    function parseJsonObject(jsonObject) {
        for (var i = 0; i < jsonObject.length; i++) {
            newRow(jsonObject[i]);
            listaVehiculos.push(jsonObject[i]);
        }
    }
    General.parseJsonObject = parseJsonObject;
    /**
     * Comprueba que se completen todos los campos del formulario y llama a las funciones para agregar una nueva mascota en la lista y en la tabla de index.html
     */
    function newVehicle() {
        var value = false;
        //let nextId = findNextId();
        var nextId = listaVehiculos.length + 1;
        var marca = document.getElementById('marca');
        var modelo = document.getElementById('modelo');
        var precio = document.getElementById('precio');
        var tipo = document.getElementById('tipo-vehiculo');
        switch (tipo.value) {
            case "1": {
                value = newCar(nextId);
                break;
            }
            case "2": {
                value = newVan(nextId);
                break;
            }
        }
        if (value) {
            if (confirm("¿Esta seguro que desea agregar el vehiculo?")) {
                var data = { id: nextId, marca: marca.value, modelo: modelo.value, precio: precio.value };
                saveNewCar(data);
                changeLabelNewCarForm();
            }
        }
    }
    General.newVehicle = newVehicle;
    /**
     * Agrega una nuevo auto en la lista de vehiculos
     * @param id
     */
    function newCar(id) {
        var value = false;
        var marca = document.getElementById('marca');
        var modelo = document.getElementById('modelo');
        var precio = document.getElementById('precio');
        var puertas = document.getElementById('puertas');
        if (General.validString(marca.value)) {
            if (General.validString(modelo.value)) {
                if (General.validPrice(precio.value)) {
                    var car = new General.Auto(id, marca.value, modelo.value, Number.parseInt(precio.value), Number.parseInt(puertas.value));
                    listaVehiculos.push(car);
                    value = true;
                }
                else {
                    document.getElementById("precio").className = "error";
                }
            }
            else {
                document.getElementById("modelo").className = "error";
            }
        }
        else {
            document.getElementById("marca").className = "error";
        }
        return value;
    }
    General.newCar = newCar;
    /**
     * Agrega una nueva camioneta en la lista de vehiculos
     * @param id
     */
    function newVan(id) {
        var value = false;
        var marca = document.getElementById('marca');
        var modelo = document.getElementById('modelo');
        var precio = document.getElementById('precio');
        var es4x4 = document.getElementById('cuatro-x-cuatro');
        if (General.validString(marca.value)) {
            if (General.validString(modelo.value)) {
                if (General.validPrice(precio.value)) {
                    if (es4x4.value == "Si") {
                        var van = new General.Camioneta(id, marca.value, modelo.value, Number.parseInt(precio.value), true);
                        listaVehiculos.push(van);
                        value = true;
                    }
                    else {
                        var van = new General.Camioneta(id, marca.value, modelo.value, Number.parseInt(precio.value), false);
                        listaVehiculos.push(van);
                        value = true;
                    }
                }
                else {
                    document.getElementById("precio").className = "error";
                }
            }
            else {
                document.getElementById("modelo").className = "error";
            }
        }
        else {
            document.getElementById("marca").className = "error";
        }
        return value;
    }
    General.newVan = newVan;
    /**
     * Bloquea la pagina con un spinner y agrega un nuevo vehiculo en la tabla
     * @param {*} jsonObject
     */
    function saveNewCar(jsonObject) {
        loadPromise().then(function () {
            newRow(jsonObject);
            console.log("finalizado");
        })["catch"](function () {
            console.log("Fallo");
        });
    }
    General.saveNewCar = saveNewCar;
    function loadPromise() {
        return new Promise(function (resolve, reject) {
            showSpinner();
            setTimeout(function () {
                hideSpinner();
                resolve();
                reject();
            }, 4000);
        });
    }
    General.loadPromise = loadPromise;
    /*export function findNextId(): number {
        let nextId = listaVehiculos.reduce(function(prev, next) {
            if (next.getId() > prev.getId()) {
                prev.setId(next.getId() + 1);
                return prev;
            }
        });

        return nextId.getId();
    }*/
    function selectTypeVehicle() {
        inputTipo = document.getElementById('tipo-vehiculo');
        inputPuertas = document.getElementById('puertas');
        input4x4 = document.getElementById('cuatro-x-cuatro');
        if (inputTipo.value == "1") {
            inputPuertas.disabled = false;
            input4x4.disabled = true;
        }
        else {
            inputPuertas.disabled = true;
            input4x4.disabled = false;
        }
    }
    General.selectTypeVehicle = selectTypeVehicle;
    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Alta" / "Cerrar formulario"
     * @param {*} event
     */
    function newCarForm(event) {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        changeLabelNewCarForm();
    }
    General.newCarForm = newCarForm;
    /**
     * Muestra el formulario
     */
    function showForm() {
        document.getElementById('container').hidden = false;
    }
    General.showForm = showForm;
    /**
     * Oculta el formulario
     */
    function hideForm() {
        document.getElementById('container').hidden = true;
    }
    General.hideForm = hideForm;
    /**
     * Deshabilita el comportamiento por defecto del boton para cerrar el formulario
     * @param event
     */
    function disableEventDefaultCloseButton(event) {
        event.preventDefault();
        changeLabelNewCarForm();
    }
    General.disableEventDefaultCloseButton = disableEventDefaultCloseButton;
    /**
     * Cambia el texto del boton 'Nueva Mascota' cada vez que se selecciona
     */
    function changeLabelNewCarForm() {
        var visibleForm = document.getElementById('container').hidden;
        var addFormLabel = document.getElementById('openForm');
        inputTipo = document.getElementById('tipo-vehiculo');
        if (visibleForm == true) {
            showForm();
            addFormLabel.value = "Cerrar formulario";
        }
        else {
            hideForm();
            clearTextBoxForm();
            clearBorderTextBoxForm();
            addFormLabel.value = "Alta";
        }
    }
    General.changeLabelNewCarForm = changeLabelNewCarForm;
    /**
     * Muestra el gif de carga mientras se envia la informacion al servidor
     */
    function hideSpinner() {
        document.getElementById("loading").hidden = true;
    }
    General.hideSpinner = hideSpinner;
    /**
     * Oculta el gif de carga mientras se envia la informacion al servidor
     */
    function showSpinner() {
        document.getElementById("loading").hidden = false;
    }
    General.showSpinner = showSpinner;
    /**
     * Limpia los campos del formulario una vez enviados los datos
     */
    function clearTextBoxForm() {
        inputMarca = document.getElementById('marca');
        inputModelo = document.getElementById('modelo');
        inputPrecio = document.getElementById('precio');
        inputMarca.value = "";
        inputModelo.value = "";
        inputPrecio.value = "";
    }
    General.clearTextBoxForm = clearTextBoxForm;
    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    function clearBorderTextBoxForm() {
        document.getElementById("marca").className = "noError";
        document.getElementById("modelo").className = "noError";
        document.getElementById("precio").className = "noError";
    }
    General.clearBorderTextBoxForm = clearBorderTextBoxForm;
})(General || (General = {}));
