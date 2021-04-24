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

$('#formVentas button').click(function() {
  if(this.id == 'btnClientes') {
    let titulos = ['Nombre', 'Apellidos'];
    modal('/datos/clientes', 'Clientes', titulos);
  }
  else {
    let titulos = ['Nombre', 'Marca', 'Precio'];
    modal('/datos/articulos', 'Artículos', titulos);
  }
});

function modal(url, titulo, titulos) {
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
    $('#' + idArticulo).css('background', '#435ebe40');
    for (let i = 0; i < datos.length; i++) {
      if(datos[i].Id == idArticulo) {
        let articulo = new Object();
        articulo.Id = datos[i].Id;
        articulo.Nombre = datos[i].Nombre;
        articulo.Marca = datos[i].Marca;
        articulo.Precio = datos[i].Precio;
        articulo.Importe = datos[i].Precio;
        articulos.push(articulo);
        let tr = "";
        tr += `
        <tr id="` + datos[i].Id + `">
        <td>` + datos[i].Nombre + `</td>
        <td>` + datos[i].Marca + `</td>
        <td><input type="number" id="txtCantidad-` + datos[i].Id + `" data-value="` + datos[i].Id + `" class="form-control valt cantidad" value="1"></td>
        <td>$` + datos[i].Precio + `</td>
        <td id="thImporte-` + datos[i].Id + `">$` + datos[i].Precio + `</td>
        <td>
        <button type="button" class="input-group-text" id="btnEliminar">
        <i class="bi bi-trash"></i>
        </button></td>
        </tr>`;
        $('#tablaVentas #tr').append(tr);
      }
    }
  }
  $('#modal').modal('hide');
});

$('body').on('keyup', '.cantidad', function(evt) {
  let id = $(this).attr('data-value');
  let cantidad = 0;
  let importe = 0;
  cantidad = parseFloat($('#' + this.id).val());
  if(cantidad > 0) {
    for (var i = 0; i < datos.length; i++) {
      if(datos[i].Id == id) {
        importe = parseFloat(datos[i].Precio) * cantidad;
        importeActual = datos[i].Precio;
      }
    }
    $('#thImporte-' + id).html('$' + importe);
  }
  else $('#thImporte-' + id).html('$' + importeActual);
});
