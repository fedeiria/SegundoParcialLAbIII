namespace General {

    // variable para almacenar el dato de la fila seleccionada
    var trClick: Node;

    // Lista de vehiculos
    var listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();

    // variables para manejar los datos del formulario con el DOM
    var inputMarca: HTMLInputElement = <HTMLInputElement>document.getElementById('marca');
    var inputModelo: HTMLInputElement = <HTMLInputElement>document.getElementById('modelo');
    var inputPrecio: HTMLInputElement = <HTMLInputElement>document.getElementById('precio');
    var inputTipo: HTMLInputElement = <HTMLInputElement>document.getElementById('tipo-vehiculos');
    var inputPuertas: HTMLInputElement = <HTMLInputElement>document.getElementById('puertas');
    var input4x4: HTMLInputElement = <HTMLInputElement>document.getElementById('cuatro-x-cuatro');

    window.addEventListener('load', hideForm);

    /**
     * Crea una fila con la variable pasada por parametro
     * @param {*} jsonObject 
     */
    export function newRow(jsonObject) {
        let newRow = document.createElement('tr');

        // Agrego el id
        let newCellId = document.createElement('td');
        let textNodeId = document.createTextNode(jsonObject.id);
        newCellId.appendChild(textNodeId);
        newRow.appendChild(newCellId);

        // Agrego la marca
        let newCellMarca = document.createElement('td');
        let textNodeMarca = document.createTextNode(jsonObject.marca);
        newCellMarca.appendChild(textNodeMarca);
        newRow.appendChild(newCellMarca);
    
        // Agrego el modelo
        let newCellModelo = document.createElement('td');
        let textNodeModelo = document.createTextNode(jsonObject.modelo);
        newCellModelo.appendChild(textNodeModelo);
        newRow.appendChild(newCellModelo);

        // Agrego el precio
        let newCellPrecio = document.createElement('td');
        let textNodePrecio = document.createTextNode(jsonObject.precio);
        newCellPrecio.appendChild(textNodePrecio);
        newRow.appendChild(newCellPrecio);

        //Agrego la accion
        let newCellAccion = document.createElement('td');
        let newButton = document.createElement('button');
        newCellAccion.appendChild(newButton).value = "Accion";
        newRow.appendChild(newCellAccion);
    
        // Evento doble click, llamo a la funcion 'clicRow'
        //newRow.addEventListener('click', clickRow);
    
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }

    /**
    * Recorre los datos del objeto JSON para ir formando la tabla
    * @param {*} jsonObject 
    */
    export function parseJsonObject(jsonObject) {
        for (var i = 0; i < jsonObject.length; i++) {
            newRow(jsonObject[i]);
            listaVehiculos.push(jsonObject[i]);
        }
    }

    /**
     * Comprueba que se completen todos los campos del formulario y llama a las funciones para agregar una nueva mascota en la lista y en la tabla de index.html
     */
    export function newVehicle() {
        let value: boolean = false;
        //let nextId = findNextId();
        let nextId = listaVehiculos.length + 1;
        let marca = <HTMLInputElement>document.getElementById('marca');
        let modelo = <HTMLInputElement>document.getElementById('modelo');
        let precio = <HTMLInputElement>document.getElementById('precio');
        let tipo = <HTMLInputElement>document.getElementById('tipo-vehiculo');

        switch(tipo.value) {
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
                let data = { id:nextId, marca:marca.value, modelo:modelo.value, precio:precio.value };

                saveNewCar(data);
                changeLabelNewCarForm();
            }
        }
    }

    /**
     * Agrega una nuevo auto en la lista de vehiculos
     * @param id 
     */
    export function newCar(id: number): boolean {
        let value: boolean = false;
        let marca = <HTMLInputElement>document.getElementById('marca');
        let modelo = <HTMLInputElement>document.getElementById('modelo');
        let precio = <HTMLInputElement>document.getElementById('precio');
        let puertas = <HTMLInputElement>document.getElementById('puertas');

        if (General.validString(marca.value)) {
            if (General.validString(modelo.value)) {
                if (General.validPrice(precio.value)) {
                    let car: General.Auto = new General.Auto(id, marca.value, modelo.value, Number.parseInt(precio.value), Number.parseInt(puertas.value));
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

    /**
     * Agrega una nueva camioneta en la lista de vehiculos
     * @param id 
     */
    export function newVan(id: number): boolean {
        let value: boolean = false;
        let marca = <HTMLInputElement>document.getElementById('marca');
        let modelo = <HTMLInputElement>document.getElementById('modelo');
        let precio = <HTMLInputElement>document.getElementById('precio');
        let es4x4 = <HTMLInputElement>document.getElementById('cuatro-x-cuatro');

        if (General.validString(marca.value)) {
            if (General.validString(modelo.value)) {
                if (General.validPrice(precio.value)) {
                    if (es4x4.value == "Si") {
                        let van: General.Camioneta = new General.Camioneta(id, marca.value, modelo.value, Number.parseInt(precio.value), true);
                        listaVehiculos.push(van);
                        value = true;
                    }
                    else {
                        let van: General.Camioneta = new General.Camioneta(id, marca.value, modelo.value, Number.parseInt(precio.value), false);
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

    /**
     * Bloquea la pagina con un spinner y agrega un nuevo vehiculo en la tabla
     * @param {*} jsonObject 
     */
    export function saveNewCar(jsonObject): void {
        loadPromise().then(() => {
            newRow(jsonObject);
            console.log("finalizado");
        }).catch(() => {
            console.log("Fallo");
        });
    }

    export function loadPromise() {
        return new Promise((resolve, reject) => {
            showSpinner();
            setTimeout(() => {
                hideSpinner();
                resolve();
                reject();
            }, 4000);
        });
    }

    /*export function findNextId(): number {
        let nextId = listaVehiculos.reduce(function(prev, next) {
            if (next.getId() > prev.getId()) {
                prev.setId(next.getId() + 1);
                return prev;
            }
        });

        return nextId.getId();
    }*/

    export function selectTypeVehicle(): void {
        inputTipo = <HTMLInputElement>document.getElementById('tipo-vehiculo');
        inputPuertas = <HTMLInputElement>document.getElementById('puertas');
        input4x4 = <HTMLInputElement>document.getElementById('cuatro-x-cuatro');

        if (inputTipo.value == "1") {
            inputPuertas.disabled = false;
            input4x4.disabled = true;
        }
        else {
            inputPuertas.disabled = true;
            input4x4.disabled = false;
        }
    }

    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Alta" / "Cerrar formulario"
     * @param {*} event 
     */
    export function newCarForm(event): void {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        changeLabelNewCarForm();
    }
    
    /**
     * Muestra el formulario
     */
    export function showForm(): void {
        document.getElementById('container').hidden = false;
    }

    /**
     * Oculta el formulario
     */
    export function hideForm(): void {
        document.getElementById('container').hidden = true;
    }

    /**
     * Deshabilita el comportamiento por defecto del boton para cerrar el formulario
     * @param event
     */
    export function disableEventDefaultCloseButton(event) {
        event.preventDefault();
        changeLabelNewCarForm();
    }

    /**
     * Cambia el texto del boton 'Nueva Mascota' cada vez que se selecciona
     */
    export function changeLabelNewCarForm(): void {
        let visibleForm = document.getElementById('container').hidden;
        let addFormLabel = <HTMLInputElement>document.getElementById('openForm');
        inputTipo = <HTMLInputElement>document.getElementById('tipo-vehiculo');

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

    /**
     * Muestra el gif de carga mientras se envia la informacion al servidor
     */
    export function hideSpinner(): void {
        document.getElementById("loading").hidden = true;
    }

    /**
     * Oculta el gif de carga mientras se envia la informacion al servidor
     */
    export function showSpinner(): void {
        document.getElementById("loading").hidden = false;
    }

    /**
     * Limpia los campos del formulario una vez enviados los datos
     */
    export function clearTextBoxForm(): void {
        inputMarca = <HTMLInputElement>document.getElementById('marca');
        inputModelo = <HTMLInputElement>document.getElementById('modelo');
        inputPrecio = <HTMLInputElement>document.getElementById('precio');

        inputMarca.value = "";
        inputModelo.value = "";
        inputPrecio.value = "";
    }

    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    export function clearBorderTextBoxForm(): void {
        document.getElementById("marca").className = "noError";
        document.getElementById("modelo").className = "noError";
        document.getElementById("precio").className = "noError";
    }
}