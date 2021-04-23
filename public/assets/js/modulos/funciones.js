$( document ).ready(function() {
    // console.log( "ready!" );
});

$('#btnClientes').click(function() {
  $.ajax({
    type: 'GET',
    url: '/datos/clientes',
    success: function(data) {
        if(data) {
          data = JSON.parse(data);
          $('#modal').modal('show');
          let titulos = ['Nombre', 'Apellidos'];
          $('#modalTitulo').html('Clientes');

          let th = "";
          for (var i = 0; i < titulos.length; i++) {
            th += '<th>' + titulos[i] + '</th>';
          }

          let tr = "";
          for (var i = 0; i < data.length; i++) {
            let name = data[i].Nombre + ' ' + data[i].Apellidos;
            tr += `
            <tr id="` + data[i].Id + `" data-name="` + name + `">
                <td>` + data[i].Nombre + `</td>
                <td>` + data[i].Apellidos + `</td>
            </tr>`;
          }
          $('#Tableth').html(th);
          $('#Tabletr').html(tr);
        }
    },
    error: function() {
        console.log("No se ha podido obtener la información");
    }
});
});

$('body').on('click', '#Tabletr tr', function(evt) {
  console.log("SELECCIONO");
  let id = $(this).attr('id');
  $('#' + id).css('background', '#435ebe40');
  let nombre = $(this).attr('data-name');
  $('#txtCliente').val('000' + id + " - " + nombre);
  $('#modal').modal('hide');
});

$('#btnArticulos').click(function() {
  // data-bs-toggle="modal" data-bs-target="#modal"
  alert('ARTICULOS');
});

function modal() {

}
