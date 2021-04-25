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
var cantidadActual = 0;
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
      let especifico = true;
      for(var i = 0; i < local.length; i++) {
        if(local[i].Id == idArticulo) especifico = false;
      }
      return especifico;
    }
    else {
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
      for(let i = 0; i < local.length; i++) {
        temporal.push(local[i]);
      }
    }
    localStorage.setItem("articulos", JSON.stringify(temporal));
  }
  if(tipo == 'eliminar') {
    if(local) {
      let t = [];
      for(let i = 0; i < local.length; i++) {
        if(local[i].Id != idArticulo) t.push(local[i]);
      }
      localStorage.setItem("articulos", JSON.stringify(t));
      let final = localStorage.getItem("articulos");
      final = JSON.parse(final);
      if(final.length == 0) {
        $('#subtotal').html('$0');
        $('#iva').html('$0');
        $('#total').html('$0');
      }
      else if(final.length >= 1) {
        var info = calculos();
        detallesVenta(info);
      }
    }
    else {
      return false;
    }
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
          <td>$` + data[i].Precio + `</td>
          </tr>`;
        }
      }

      $('#tablaModal #th').html(th);
      $('#tablaModal #tr').html(tr);
      $('#tablaModal #tr').attr('data-value', titulo);
    }
    else {
      alerta('error', 'Ha ocurrido un error, intenta más tarde.');
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
      if(especifico) {
        // No exixte articulo
        let result = getLocal('datos');
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
          cantidadActual = 1;
          articulo.Id = result['Id'];
          getLocal('agregar');
          var info = calculos();
          detallesVenta(info);
        }
      }
      else {
        alerta('warning', 'Artículo ya seleccionado.');
      }
    }
    $('#modal').modal('hide');
  }
});

$('body').on('keyup', '.cantidad', function(evt) {
  cantidadActual = $('#' + this.id).val();
  let id = $(this).attr('data-value');
  if($('#' + this.id).val()) {
    let cantidad = 0, importe = 0;
    cantidad = parseFloat($('#' + this.id).val());
    for (let i = 0; i < datos.length; i++) {
      if(datos[i].Id == id) {
        importe = parseFloat(datos[i].Precio) * cantidad;
        importeActual = datos[i].Precio;
      }
    }
    if(cantidad == 0) {
      $('#importe-' + id).html('$0');
    }
    else if(cantidad > 0) $('#importe-' + id).html('$' + importe);
    else {
      $('#importe-' + id).html('$' + importeActual);
    }
  }
  else $('#importe-' + id).html('$0');
  var info = calculos();
  detallesVenta(info);
});

$('body').on('click', '#btnEliminar', function() {
  idArticulo = $(this).attr('data-value');
  $(this).parents('tr').first().remove();
  getLocal('eliminar');
  alerta('success', 'Eliminado con éxito.');
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
    if(data != 'error') {
      $('#subtotal').html('$' + data['subtotal']);
      $('#iva').html('$' + data['iva']);
      $('#total').html('$' + data['total']);
    }
    else {
      alerta('error', 'Ha ocurrido un error, intenta más tarde.');
    }
  });
}

$('#btnVenta').click(function() {
  if(idCliente && cantidadActual && parseInt(cantidadActual) > 0 && getLocal('existe')) {
    var info = calculos();
    ajax('GET', '/ventas/registrar/' + idCliente, info, function(data) {
      if(data != 'error') {
        alerta('success', 'Bien Hecho, Tu venta ha sido registrada correctamente.');
        $('.swal2-actions .swal2-confirm').html('<a style="padding: 70px;" href="">OK</a>');
      }
      else {
        alerta('error', 'Ha ocurrido un error, intenta más tarde.');
      }
    });
  }
  else {
    alerta('warning', 'Campos vacíos.');
  }
});

$('#btnCancelarVenta').click(function() {
  Swal.fire({
    icon: 'warning',
    title: '¿Desea salir de la pantalla actual?',
    showCancelButton: true,
  });
  $('.swal2-actions .swal2-confirm').html('<a href="/">OK</a>');
});

function alerta(tipo, texto) {
  Swal.fire({
    icon: tipo,
    title: texto
  });
}
