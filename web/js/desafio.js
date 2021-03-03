$(document).ready(function(){
    $.ajax({type: "GET",
          url: "js/productos.js",
          dataType: "script",
    });
});

var carrito = []
var total = 0
var storage = localStorage
var crt = ""
var carritoNum = "0"

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

function cantidadTotal(id){
	storage[id] = parseInt($("#" + id).val());
	if (storage[id] == 0){
		if (confirm("Esta seguro de que eliminar este produto?")){
		localStorage.removeItem(id)
		$("#mostrarCarrito").removeClass()
		}
		else{
			storage[id] = 1
		}
		mostrarCarrito();
	}
	$("main").load("carrito.html");
	$(document).ajaxComplete(function() {
	$("#mostrarCarrito").removeClass()
	  	mostrarCarrito();
 	})
}

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

function enCarrito(){
	for (const [key, value] of Object.entries(storage)){
		var bp = document.getElementById("bp-" + key);
		if (bp != null){
			bp.innerHTML = "(" + parseInt(storage[key]) + " en carrito)";
		}
	}
}

function mostrarCarrito(){
		var productosCarrito = []
		var total = 0
		var mostrarCarrito = document.getElementById("mostrarCarrito");
		for (const [key, value] of Object.entries(storage)){
			sub = parseInt(list[key].precio * storage[key])
			var producto = 
				`<tr>
					<td class="white col-2"><img class="col-12" src="img/${list[key].id}.jpg"></td> 
					<td scope="col" class="table__producto col-9 white"><b>${list[key].nombre}</b><p>Tipo de producto: ${list[key].tipo}</p><p>Tipo de modelo: ${list[key].modelo}</p></td> 
					<td class="white col-1">¥${sub}</td> 
					<td  class="white col-1"><input class="col-12 cantidad" type="number" onchange="cantidadTotal(${list[key].numero})" id="${list[key].numero}" min="0" max="99" value="${storage[key]}" style="padding-right: 0px; padding-left: 14px;">¥${list[key].precio}</td>
				</tr>`
			productosCarrito.push(producto);
			total = total + sub;
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
						    	<th class="col-2"> </th>
							    <th scope="col" class="white col-9">Nombre</th>
							    <td class="white col-1" >Precio</td>
							    <td class="white col-1">Cantidad</td>
							</tr>
							` + productosCarrito + `
							<tr>
							    <td class="white col-2">    <button onclick="vaciar()" class="btn btn-primary btn-file">Vaciar carrito</button></td>
						    	<td  class="white col-9"></td>
							    <td scope="col" class="table__producto col-1 white">Total:</td>
							    <td class="white col-1">¥${total}</td>
							</tr>
						</thead>
					</table>`
			}
		}
}

$(document).ready(function(){
	if ($("main").is(":empty")){
  		$("main").load("home.html");
  		fullNum()
  	}
  	$("a").click(function(){
    	toLoad = (this.id)
    	$("main").load(toLoad);
    	$(document).ajaxComplete(function() {
	  		enCarrito();
	  		fullNum();
 		})
 	})
 	$("#carrito").click(function(){
 		$("main").load("carrito.html")
 		$(document).ajaxComplete(function() {
 			$("#mostrarCarrito").addClass("animate__animated animate__fadeIn")
	  		mostrarCarrito();
 		});
 	});
})

function enviar(){
     alert("sadsadsad");
};

$(function(){
	$("#carrito-dropdown").on({
	  	mouseenter: function(){
	    	$(this).css("background-color", "lightgray");
	},
		mouseleave: function(){
	   		$(this).css("background-color", "lightblue");
			},
	  	click: function(){
	    	for (const [key, value] of Object.entries(storage)){
				carrito.push(list[key].nombre + " x" + storage[key]);
			}
			for (const [key, value] of Object.entries(storage)){
				sub = parseInt(list[key].precio * storage[key])
				total = total + sub;
			}
			final = (carrito.join("<br>"))
			var crt = document.getElementById("crt");
			if(final !== ""){
				crt.innerHTML = final
			}
			else{
				crt.innerHTML = "Nada Aun"
			} 
			$("#ttl").text("El total seria de ¥" + total);
			$( ".carrito-dropdown" ).toggle();
			carrito = []
			total = 0
		},
	})
});

$(document).mouseup(function(e) {
    var container = $(".carrito-dropdown");
    var button = $("#carrito-dropdown")
    $("#carrito").click(function(){
    	container.hide();
    })

    if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0){
        container.hide();
    }
});