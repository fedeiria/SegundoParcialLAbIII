var General;
(function (General) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = this.setId(id);
            this.marca = this.setMarca(marca);
            this.modelo = this.setModelo(modelo);
            this.precio = this.setPrecio(precio);
        }
        /**
         * Setea el id ingresado.
         * @param id parametro a setear
         */
        Vehiculo.prototype.setId = function (id) {
            return this.id = id;
        };
        /**
         * Setea la marca ingresada.
         * @param marca parametro a setear
         */
        Vehiculo.prototype.setMarca = function (marca) {
            return this.marca = marca;
        };
        /**
         * Setea el modelo ingresado.
         * @param modelo parametro a setear
         */
        Vehiculo.prototype.setModelo = function (modelo) {
            return this.modelo = modelo;
        };
        /**
         * Setea el precio ingresado.
         * @param precio parametro a setear
         */
        Vehiculo.prototype.setPrecio = function (precio) {
            return this.precio = precio;
        };
        /**
         * Retorna el id.
         */
        Vehiculo.prototype.getId = function () {
            return this.id;
        };
        /**
         * Retorna la marca.
         */
        Vehiculo.prototype.getMarca = function () {
            return this.marca;
        };
        /**
         * Retorna el modelo.
         */
        Vehiculo.prototype.getModelo = function () {
            return this.modelo;
        };
        /**
         * Retorna el precio.
         */
        Vehiculo.prototype.getPrecio = function () {
            return this.precio;
        };
        return Vehiculo;
    }());
    General.Vehiculo = Vehiculo;
})(General || (General = {}));
