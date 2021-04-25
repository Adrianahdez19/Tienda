$( document ).ready(function() {
  localStorage.removeItem('articulos');

  // Bloquear letras
  $('body').on('keypress', '.valt', function(tecla) {
    if(tecla.charCode < 48 || tecla.charCode > 57) { // N�meros
      return false;
    }
  });
});

var datos = "";
var idCliente = "";
var idArticulo = "";
var articulo = new Object();
var local = [];
var importeActual = 0;
var subtotal = 0;
var iva = 0;
var total = 0;

function getLocal(tipo) {
  local = localStorage.getItem("articulos");
  local = JSON.parse(local);

  if(tipo == 'existe') {
    if(local) return true;
    else return false;
  }
  if(tipo == 'especifico') {
    if(local) {
      // console.log("LOCAL TIENE");
      let especifico = true;
      for(var i = 0; i < local.length; i++) {
        if(local[i].Id == idArticulo) especifico = false;
      }
      return especifico;
    }
    else {
      // console.log("LOCAL VACIO");
      return true;
    }
  }
  if(tipo == 'datos') {
    let result = false;
    for(let i = 0; i < datos.length; i++) {
      if(datos[i].Id == idArticulo) result = datos[i];
    }
    return result;
  }
  if(tipo == 'agregar') {
    let temporal = [];
    temporal.push(articulo);
    if(local) {
      console.log("DEBE DE CREAR TEMPORAL");
      for(let i = 0; i < local.length; i++) {
        temporal.push(local[i]);
      }
    }
    localStorage.setItem("articulos", JSON.stringify(temporal));
    console.log(temporal);
  }
  if(tipo == 'eliminar') {
    // nombre.push(datos[i]);
    // // articulos.push(datos[i]);
    // localStorage.setItem("articulos", JSON.stringify(nombre));
    // let final = localStorage.getItem("articulos");
    // final = JSON.parse(final);
    // console.log(final);
  }
}

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
  ajax('GET', url, info, function(data) {
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
  let id = this.id;
  let tipo = $(this).parent().attr('data-value');
  if(tipo) {
    if(tipo == 'Clientes') {
      idCliente = id;
      $('#tablaModal #' + idCliente).css('background', '#435ebe40');
      let nombre = $(this).attr('data-name');
      $('#txtCliente').val('000' + idCliente + " - " + nombre);
    }
    else {
      idArticulo = id;
      $('#tablaModal #' + idArticulo).css('background', '#435ebe40');
      let especifico = getLocal('especifico');
      // console.log("DICE SI DEBE AREGAGR O NO: " + especifico);
      if(especifico) {
        // No exixte articulo
        let result = getLocal('datos');
        // console.log(result);
        if(result) {
          let tr = "";
          tr += `
          <tr id="` + result['Id'] + `">
          <td>` + result['Nombre'] + `</td>
          <td>` + result['Marca'] + `</td>
          <td><input type="text" id="txtCantidad-` + result['Id'] + `" data-value="` + result['Id'] + `" class="form-control valt cantidad" value="1"></td>
          <td>$` + result['Precio'] + `</td>
          <td id="importe-` + result['Id'] + `">$` + result['Precio'] + `</td>
          <td>
          <button type="button" class="input-group-text" id="btnEliminar" data-value="` + result['Id'] + `">
          <i class="bi bi-trash"></i>
          </button></td>
          </tr>`;
          $('#tablaVentas #tr').append(tr);

          // Guardar
          articulo.Id = result['Id'];
          getLocal('agregar');
          var info = calculos();
          detallesVenta(info);
        }
      }
      else {
        console.log("YA SELECCIONO ESE ARTICULO");
      }
    }
    $('#modal').modal('hide');
  }
});

$('body').on('change', '.cantidad', function(evt) {
  let id = $(this).attr('data-value');
  if($('#' + this.id).val()) {
    let cantidad = 0, importe = 0;
    cantidad = parseFloat($('#' + this.id).val());
    for (let i = 0; i < datos.length; i++) {
      if(datos[i].Id == id) {
        importe = parseFloat(datos[i].Precio) * cantidad;
        importeActual = datos[i].Precio;
        var info = calculos();
        detallesVenta(info);
      }
    }
    if(cantidad > 0) $('#importe-' + id).html('$' + importe);
    else $('#importe-' + id).html('$' + importeActual);
  }
});

$('body').on('click', '#btnEliminar', function() {
  let id = $(this).attr('data-value');
  $(this).parents('tr').first().remove();
  for(let i = 0; i < articulos.length; i++) {
    if(articulos[i].Id == id) {
      delete articulos[i];
    }
  }
});

function calculos() {
  var info = localStorage.getItem("articulos");
  info = JSON.parse(info);
  for (var i = 0; i < info.length; i++) {
    let id = info[i].Id;
    info[i].Cantidad = $('#txtCantidad-' + id).val();
  }
  return info;
}

function detallesVenta(info) {
  ajax('GET', '/ventas/venta', info, function(data) {
    console.log(data);
    if(data != 'error') {
      $('#subtotal').html('$' +data['subtotal']);
      $('#iva').html('$' + data['iva']);
      $('#total').html('$' +data['total']);
    }
    else {

    }
  });
}

$('#btnVenta').click(function() {
  if(idCliente && getLocal('existe')) {
    var info = calculos();
    ajax('GET', '/ventas/registrar/' + idCliente, info, function(data) {
      console.log(data);
      if(data != 'error') {
        alerta('success', 'Bien Hecho, Tu venta ha sido registrada correctamente.');
        $('.swal2-actions .swal2-confirm').html('<a href="">OK</a>');
      }
      else {

      }
    });
  }
  else {
    console.log("LO SIENTO LLENA LOS DATOS");
  }
});

function alerta(tipo, texto) {
  Swal.fire({
    icon: tipo,
    title: texto
  });
}
