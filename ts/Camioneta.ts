namespace General {
    export class Camioneta extends Vehiculo {
        private cuatroXcuatro: boolean;

        constructor(id: number, marca: string, modelo: string, precio: number, cuatroXcuatro: boolean) {
            super(id, marca, modelo, precio);
            this.cuatroXcuatro = this.setCuatroXCuatro(cuatroXcuatro);
        }

        /**
         * Setea si es 4x4.
         * @param age
         */
        public setCuatroXCuatro(cuatroXcuatro: boolean): boolean {
            return this.cuatroXcuatro = cuatroXcuatro;
        }

        /**
         * Retorna si es 4x4
         */
        public getCuatroXCuatro(): boolean {
            return this.cuatroXcuatro;
        }
    }
}