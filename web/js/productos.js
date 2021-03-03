function Producto(nombre, precio, modelo, tipo, numero, id){
	this.nombre = nombre;
	this.precio = precio;
	this.modelo = modelo;
	this.numero = numero;
	this.tipo = tipo;
	this.id = id;
}

var kimetsu = new Producto("Kimetsu movie book", 1000, "Especial", "Libro", 1, "kimetsu")
var kimetsu2 = new Producto("Parca Kimetsu no yaiba", 6000, "L", "Ropa", 2, "kimetsu2")
var onePiece = new Producto("Llavero One piece", 200, "Unico", "Llavero", 3, "onepiece")
var onePiece2 = new Producto("Funko Pop Chopper One Piece", 3000, "Unico", "Funko Pop", 4, "onepiece2")
var kimetsu3 = new Producto("Llavero y tsuka para llave Kimetsu", 400, "Unico", "Llavero", 5, "kimetsu3")
var pocky = new Producto("Pocky", 290, "50g", "Comida", 6, "pocky")
var kracie = new Producto("Kracie Popin’ Cookin' Animal Pancake", 490, "Unico", "Comida", 7, "kracie")
var kracie2 = new Producto("Kracie Popin' Cookin' Ice Cream Cake ", 460, "Unico", "Comida", 8, "kracie2")
var nezuko = new Producto("Nendoroid Nezuko Kamado", 6000, "Unico", "Nendroid", 9, "nezuko")
var jojo = new Producto("Llavero mascara JoJo", 600, "Unico", "Llavero", 10, "jojo")
var list = [0, kimetsu, kimetsu2, onePiece, onePiece2, kimetsu3, pocky, kracie, kracie2, nezuko, jojo]