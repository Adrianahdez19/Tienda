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
          let th = ['Nombre', 'Apellidos'];
          $('#modalTitulo').html('Clientes');
          let contenido =
          `<table class="table table-bordered mb-0">
              <thead>
                  <tr>`;
                  for (var i = 0; i < th.length; i++) {
                    contenido += '<th>' + th[i] + '</th>';
                  }
                  contenido += `
                  </tr>
              </thead>
              <tbody>`;
                for (var i = 0; i < data.length; i++) {
                  contenido += `
                  <tr>
                      <td>` + data[i].Nombre + `</td>
                      <td>` + data[i].Apellidos + `</td>
                  </tr>`;
                }
                contenido += `
              </tbody>
          </table>`;
          $('#modalContenido').html(contenido);
        }
    },
    error: function() {
        console.log("No se ha podido obtener la información");
    }
});
});

$('#btnArticulos').click(function() {
  // data-bs-toggle="modal" data-bs-target="#modal"
  alert('ARTICULOS');
});

function modal() {

}
