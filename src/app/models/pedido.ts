export class Pedido{
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public cantidad: number,
        public producto_id: number
    ){}
}