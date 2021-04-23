<!-- Nueva Venta -->
<section class="section">
    <div class="row" id="table-bordered">
        <div class="col-12">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                      <!-- Basic Horizontal form layout section start -->
                      <div class="row match-height">
                          <div class="col-md-6 col-12">
                              <div class="card">
                                  <div class="card-content">
                                      <div class="card-body">
                                          <form class="form form-horizontal">
                                              <div class="form-body">
                                                  <div class="row">
                                                      <div class="col-md-4">
                                                          <label>Cliente:</label>
                                                      </div>
                                                      <div class="col-md-8 form-group">
                                                              <div class="input-group mb-3">
                                                      <input type="text" class="form-control"
                                                          placeholder="Juan Pérez"
                                                          aria-label="Juan Pérez"
                                                          aria-describedby="button-addon2">
                                                          <button type="button" class="input-group-text" id="basic-addon1" data-bs-toggle="modal" data-bs-target="#modal">
                                                            <i class="bi bi-plus"></i>
                                                          </button>
                                                  </div>
                                                      </div>
                                                      <div class="col-md-4">
                                                          <label>Artículo:</label>
                                                      </div>
                                                      <div class="col-md-8 form-group">
                                                        <button type="submit"
                                                            class="btn btn-primary me-1 mb-1">Agregar</button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                <!-- // Basic Horizontal form layout section end -->
                    </div>
                    <!-- table bordered -->
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th>DESCRIPCIÓN ARTÍCULO</th>
                                    <th>MARCA</th>
                                    <th>CANTIDAD</th>
                                    <th>PERCIO</th>
                                    <th>IMPORTE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-bold-500">Michael Right</td>
                                    <td>$15/hr</td>
                                    <td class="text-bold-500">UI/UX</td>
                                    <td>Remote</td>
                                    <td>Austin,Taxes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End Nueva Venta -->

<!-- Modal Clientes -->
<?php
$tituloModal = 'Clientes';
$thModal = array('Nombre', 'Apellidos');
$contenidoModal =
'<div class="table-responsive">
    <table class="table table-bordered mb-0">
        <thead>
            <tr>';
              foreach ($thModal as $th):
                $contenidoModal .= '<th>' . $th . '</th>';
              endforeach;
              $contenidoModal .= '
            </tr>
        </thead>
        <tbody>
            <tr>';
              foreach ($thModal as $th):
                $contenidoModal .= '<td>' . $th . '</td>';
              endforeach;
              $contenidoModal .= '
            </tr>
        </tbody>
    </table>
</div>';

require('modal.php');
?>
<!-- End Modal Clientes -->
