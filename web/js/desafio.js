//Carga la lista de productos

$(document).ready(function(){
    $.ajax({type: "GET",
          url: "js/productos.js",
          dataType: "script",
    });
});

//Prepara las variables usadas en las funciones

var carrito = []
var storage = localStorage
var crt = ""
var carritoNum = "0"
let total = 0

//Lleva la cuenta de la cantidad total de productos en el carrito y los muestra en la pagina

function fullNum(){
	var carritoFull = document.getElementById("carrito-dropdown");
	for (const [key, value] of Object.entries(storage)){
		carritoNum = parseInt(carritoNum) + parseInt(storage[key])
	}
	if (carritoNum > 0){
		carritoFull.innerHTML = "🛒 (" + carritoNum + ")";
		carritoNum = 0
	}
	else{
		carritoFull.innerHTML = "🛒";
	}
}

//Calcula el costo total de todo lo comprado


function calcTotal(){
	total = 0
	for (const [key, value] of Object.entries(storage)){
		sub = parseInt(list[key].precio * storage[key])
		total = total + sub;
		var precioTotal = document.getElementById("precioTotal");
		if (precioTotal != null){
			precioTotal.innerHTML = "¥" + total
		}
	}
}

//Agrega productos al carrito en el localStorage y si ya estan en el mismo, le suma uno a la cantidad

function add(id){
	if(id in storage){
		storage[id] = parseInt(storage[id]) + 1
	}
	else{
		storage.setItem(id, 1);
	}
	enCarrito()
	fullNum()
}

//Maneja la cantidad puesta en el input del carrito

function cantidadTotal(id){
	storage[id] = parseInt($("#" + id).val());
	if (storage[id] == 0){
		if (confirm("Esta seguro de que eliminar este produto?")){
		localStorage.removeItem(id)
		$("main").load("carrito.html");
		}
		else{
			storage[id] = 1
			mostrarCarrito()
		}
	}
	var precio = document.getElementById("td" + id);
	precio.innerHTML = "¥" + list[id].precio * storage[id];
	calcTotal()
	fullNum()

}


//Vacia el carrito

function vaciar(){
        if (confirm("Esta seguro de que quiere vaciar su carrito?")){
			$(".cantidad").text("")
			localStorage.clear()
			$("#crt").text("Nada Aun")
			$("#ttl").text("El total seria de ¥0")
			mostrarCarrito();
			fullNum();
		}
}

//Muestra que objetos hay en el carrito en la pagina de productos

function enCarrito(){
	for (const [key, value] of Object.entries(storage)){
		var bp = document.getElementById("bp-" + key);
		if (bp != null){
			bp.innerHTML = "(" + parseInt(storage[key]) + " en carrito)";
		}
	}
}

//Genera la pagina de carrito

function mostrarCarrito(){
		var productosCarrito = []
		var mostrarCarrito = document.getElementById("mostrarCarrito");
		for (const [key, value] of Object.entries(storage)){
			calcTotal()
			var producto = 
				`<tr>
					<td class="white" style="width: 50%"><img class="col-12" src="img/${list[key].id}.jpg"></td> 
					<td scope="col" class="table__producto col-9 white"><b>${list[key].nombre}</b><p class="mobile__on">¥${list[key].precio}</p><p class="mobile__off">Tipo de producto: ${list[key].tipo}</p><p class="mobile__off">Tipo de modelo: ${list[key].modelo}</p></td> 
					<td class="white col-1 mobile__off">¥${list[key].precio}</td> 
					<td  class="white col-1"><input class="col-12 cantidad" type="number" onchange="cantidadTotal(${list[key].numero})" id="${list[key].numero}" min="0" max="99" value="${storage[key]}" class="form-control" style="padding-right: 0px; padding-left: 14px";>Subtotal:<p id="td${list[key].numero}">¥${parseInt(list[key].precio * storage[key])}</p></td>
				</tr>`
			productosCarrito.push(producto);
		}
		if (mostrarCarrito != null) {
			if (storage.length == 0){
				mostrarCarrito.innerHTML = `<div class="background" style="display: flex;"><b style="padding:10% 5% 0 5%; font-size: 4rem;">Aun no ha seleccionado ningun producto.</b><img style="padding-right: 5%" src="img/nada.png"></div>`
			}
			else{
				mostrarCarrito.innerHTML =
					`<table class="table table-dark">
				    	<thead>
							<tr>
						    	<th style="width: 50%"> </th>
							    <th scope="col" class="white col-9">Nombre</th>
							    <td class="white col-1 mobile__off" >Precio</td>
							    <td class="white col-1">Cantidad</td>
							</tr>
							` + productosCarrito + `
							<tr>
							    <td style="width: 50%">    <button onclick="vaciar()" class="btn btn-primary btn-file">Vaciar carrito</button></td>
						    	<td  class="white col-9"><p class="mobile__on">Total:</p></td>
							    <td scope="col" class="table__producto col-1 white mobile__off">Total:</td>
							    <td class="white col-1" id="precioTotal">¥${total}</td>
							</tr>
						</thead>
					</table>`
			}
		}
}

//Carga el carrito del dropdown y la version mobile

function mostrarMiniCarrito(){
		productosCarrito = []
		var mostrarMiniCarrito = document.getElementById("mostrarMiniCarrito");
		for (const [key, value] of Object.entries(storage)){
			calcTotal()
			var producto = 
				`<tr>
					<td class="white" style="width: 30%"><img class="col-12" src="img/${list[key].id}.jpg"></td> 
					<td scope="col" class="table__producto col-9 white" style="width: 50%"><b>${list[key].nombre} x ${storage[key]}<p>¥${list[key].precio}</p></b></td> 
					<td  class="white col-1"><p>¥${parseInt(list[key].precio * storage[key])}</p></td>
				</tr>`
			productosCarrito.push(producto);
			final = (productosCarrito.join(""));
		}
		if (mostrarMiniCarrito != null) {
			if (storage.length == 0){
				mostrarMiniCarrito.innerHTML = `<div class="background" style="display: flex;"><b style="padding:10% 5% 0 5%; font-size: 2rem;">Aun no ha seleccionado ningun producto.</b><img style="position: relative; right: 38%; bottom: 3%;" src="img/nada.png"></div>`
			}
			else{
				mostrarMiniCarrito.innerHTML =
					`<table class="table table-dark" style="border-radius: 25px;">
				    	<thead>
							` + final + `
							<tr>
							    <td style="width: 30%"> <button onclick="vaciar()" class="btn btn-primary btn-file">Vaciar carrito</button></td>
						    	<td  class="white col-9" style="width: 50%"> <button onclick="carritoDesktop()" id="carritoMobile" class="btn btn-primary btn-file">Ir a carrito</button></td>
							    <td class="white col-1" style="width: 10%" id="precioTotalMini">Total:¥${total}</td>
							</tr>
						</thead>
					</table>`
			}
		}
}

//Se encarga de cargar las distintas paginas

$(document).ready(function(){
	if ($("main").is(":empty")){
  		$("main").load("home.html");
  		fullNum()
  	}

  	$("a").click(function(){
    	toLoad = (this.id)
    	if(toLoad != "dropdownMenuLink"){
	    	$("main").load(toLoad);
	    	$(document).ajaxComplete(function() {
		  		enCarrito();
		  		fullNum();
 			})
 		}
 		else{
 			$(".dropdown-menu").toggle()
 		}
 	})
})

 function carritoMobile(){
 		$(document).ajaxComplete(function() {
 	 	$("main").load("carrito.html");
	  		mostrarCarrito();
	  		$("#carritoMobile").hide();
 		})
 	};

function carritoDesktop(){
	$("main").load("carrito.html")
	$(document).ajaxComplete(function() {
  		mostrarCarrito();
	});
}


//Maneja el menu dropdown del carrito

$(function(){
	$("#carrito-dropdown").on({
	  	mouseenter: function(){
	    	$(this).css("background-color", "lightgray");
	},
		mouseleave: function(){
	   		$(this).css("background-color", "lightblue");
			},
	  	click: function(){
	  		$(".carrito-dropdown").toggle();
			$(".carrito-dropdown").load("minicarrito.html");
 			$(document).ajaxComplete(function() {
	  			mostrarMiniCarrito();
 			})
		},
	})
});

//Cierra el carrito dropdown cuando se clickea dos veces. se clickea fuera del mismo o se se abre la pagina de carrito 

$(document).bind( "mouseup touchend", function(e){
    var container = $(".carrito-dropdown");
  	var button = $("#carrito-dropdown")
  	var dropdown = $(".dropdown-menu");
  	var dropdownbutton = $("#dropdownMenuLink")
    $("#carritoMobile").click(function(){
    	container.hide();
    })
  	if ((!dropdown.is(e.target) && dropdown.has(e.target).length === 0 && !dropdownbutton.is(e.target) && dropdownbutton.has(e.target).length === 0)){
    	dropdown.hide();
        container.hide();
 	 }
});