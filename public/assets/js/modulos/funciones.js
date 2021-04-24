$( document ).ready(function() {
  // Bloquear letras
  $('body').on('keypress', '.valt', function(tecla) {
    if(tecla.charCode < 48 || tecla.charCode > 57) { // Números
      return false;
    }
  });
});

var datos = "";
var idCliente = "";
var idArticulo = "";
var articulos = [];
var importeActual = 0;
var subtotal = 0;
var iva = 0;
var total = 0;

$('#formVentas button').click(function() {
  if(this.id == 'btnClientes') {
    let titulos = ['Nombre', 'Apellidos'];
    modal('/ventas/datos/clientes', 'Clientes', titulos);
  }
  else {
    let titulos = ['Nombre', 'Marca', 'Precio'];
    modal('/ventas/datos/articulos', 'Artículos', titulos);
  }
});

function modal(url, titulo, titulos) {
  let info = new Object();
  ajax('GET', url, function(data) {
    if(data != 'error') {
      datos = data;
      $('#modal').modal('show');
      $('#modalTitulo').html(titulo);

      // Crear tabla
      let th = "";
      for (let i = 0; i < titulos.length; i++) {
        th += '<th>' + titulos[i] + '</th>';
      }

      let tr = "";
      for (let i = 0; i < data.length; i++) {
        if(titulo == 'Clientes') {
          let name = data[i].Nombre + ' ' + data[i].Apellidos;
          tr += `
          <tr id="` + data[i].Id + `" data-name="` + name + `">
          <td>` + data[i].Nombre + `</td>
          <td>` + data[i].Apellidos + `</td>
          </tr>`;
        }
        else {
          tr += `
          <tr id="` + data[i].Id + `">
          <td>` + data[i].Nombre + `</td>
          <td>` + data[i].Marca + `</td>
          <td>` + data[i].Precio + `</td>
          </tr>`;
        }
      }

      $('#tablaModal #th').html(th);
      $('#tablaModal #tr').html(tr);
      $('#tablaModal #tr').attr('data-value', titulo);
    }
    else {

    }
  });
}

$('body').on('click', '#tablaModal tr', function(evt) {
  console.log("SELECCIONO TR");
  let id = this.id;
  let tipo = $(this).parent().attr('data-value');
  if(tipo == 'Clientes') {
    idCliente = id;
    $('#' + idCliente).css('background', '#435ebe40');
    let nombre = $(this).attr('data-name');
    $('#txtCliente').val('000' + idCliente + " - " + nombre);
  }
  else {
    idArticulo = id;
    let bandera = false;
    console.log(articulos);
    if(articulos.length) {
      for (var i = 0; i < articulos.length; i++) {
        if(articulos[i].Id == idArticulo) {
          bandera = true;
          console.log("EXISTE");
        }
      }
    }
    if(!bandera) {
      $('#' + idArticulo).css('background', '#435ebe40');
      for (let i = 0; i < datos.length; i++) {
        if(datos[i].Id == idArticulo) {
          articulos.push(datos[i]);
          let tr = "";
          tr += `
          <tr id="` + datos[i].Id + `">
          <td>` + datos[i].Nombre + `</td>
          <td>` + datos[i].Marca + `</td>
          <td><input type="text" id="txtCantidad-` + datos[i].Id + `" data-value="` + datos[i].Id + `" class="form-control valt cantidad" value="1"></td>
          <td>$` + datos[i].Precio + `</td>
          <td id="importe-` + datos[i].Id + `">$` + datos[i].Precio + `</td>
          <td>
          <button type="button" class="input-group-text" id="btnEliminar" data-value="` + datos[i].Id + `">
          <i class="bi bi-trash"></i>
          </button></td>
          </tr>`;
          $('#tablaVentas #tr').append(tr);
        }
      }
    }
  }
  $('#modal').modal('hide');
});

$('body').on('keyup', '.cantidad', function(evt) {
  let id = $(this).attr('data-value');
  if($('#' + this.id).val()) {
    let cantidad = 0, importe = 0;
    cantidad = parseFloat($('#' + this.id).val());
    for (var i = 0; i < datos.length; i++) {
      if(datos[i].Id == id) {
        importe = parseFloat(datos[i].Precio) * cantidad;
        importeActual = datos[i].Precio;
      }
    }
    if(cantidad > 0) $('#importe-' + id).html('$' + importe);
    else $('#importe-' + id).html('$' + importeActual);
  }
});

$('body').on('click', '#btnEliminar', function() {
  let id = $(this).attr('data-value');
  $(this).parents('tr').first().remove();
  for (var i = 0; i < articulos.length; i++) {
    if(articulos[i].Id == id) {
      console.log("ENTRA A ELEMINAR");
      delete articulos[i];
    }
  }
});

// function generarJSON() {
//   var datos  = [];
//   var objeto = {};
//   for(var i= 0; i < articulos.length; i++) {
//     // var nombre = arrayNombres[i];
//     datos.push({
//       "id"    : articulos[i],
//       "cantidad"  : articulos[i]
//     });
//   }
//   objeto.datos = datos;
//   console.log(JSON.stringify(objeto));
//
//   ajax('GET', '/ventas/venta', objeto, function(data) {
//     if(data != 'error') {
//       console.log(data);
//     }
//     else {
//
//     }
//   });
// }
