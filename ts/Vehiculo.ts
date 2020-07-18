namespace General {
    export class Vehiculo {
        private id: number;
        private marca: string;
        private modelo: string;
        private precio: number;
    
        constructor(id: number, marca: string, modelo: string, precio: number) {
            this.id = this.setId(id);
            this.marca = this.setMarca(marca);
            this.modelo = this.setModelo(modelo);
            this.precio = this.setPrecio(precio);
        }
    
        /**
         * Setea el id ingresado.
         * @param id parametro a setear
         */
        public setId(id: number): number {
            return this.id = id;
        }

        /**
         * Setea la marca ingresada.
         * @param marca parametro a setear
         */
        public setMarca(marca: string): string {
            return this.marca = marca;
        }

        /**
         * Setea el modelo ingresado.
         * @param modelo parametro a setear
         */
        public setModelo(modelo: string): string {
            return this.modelo = modelo;
        }

        /**
         * Setea el precio ingresado.
         * @param precio parametro a setear
         */
        public setPrecio(precio: number): number {
            return this.precio = precio;
        }
    
        /**
         * Retorna el id.
         */
        public getId(): number {
            return this.id;
        }

        /**
         * Retorna la marca.
         */
        public getMarca(): string {
            return this.marca;
        }

        /**
         * Retorna el modelo.
         */
        public getModelo(): string {
            return this.modelo;
        }

        /**
         * Retorna el precio.
         */
        public getPrecio(): number {
            return this.precio;
        }
    }
}