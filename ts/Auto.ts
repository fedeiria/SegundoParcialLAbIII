namespace General {
    export class Auto extends Vehiculo {
        private cantidadPuertas: number;
    
        constructor(id: number, marca: string, modelo: string, precio: number, cantidadPuertas: number) {
            super(id, marca, modelo, precio);
            this.cantidadPuertas = this.setCantidadPuertas(cantidadPuertas);
        }

        /**
         * Setea la cantidad de puertas.
         * @param puertas
         */
        public setCantidadPuertas(cantidadPuertas: number): number {
            return this.cantidadPuertas = cantidadPuertas;
        }

        /**
         * Retorna la cantidad de puertas.
         */
        public getCantidadPuertas(): number {
            return this.cantidadPuertas;
        }
    }
}