<!-- Nueva Venta -->
<section class="section">
  <div class="row" id="table-bordered">
    <div class="col-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body">
            <div class="row match-height">
              <div class="col-md-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <form id="formVentas" class="form form-horizontal">
                        <div class="form-body">
                          <div class="row">
                            <div class="col-md-4">
                              <label>Cliente:</label>
                            </div>
                            <div class="col-md-8 form-group">
                              <div class="input-group mb-3">
                                <input type="text" id="txtCliente" class="form-control"
                                placeholder="Cliente"
                                aria-label="Cliente"
                                aria-describedby="button-addon2" disabled>
                                <button type="button" class="input-group-text" id="btnClientes">
                                  <i class="bi bi-plus"></i>
                                </button>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <label>Artículo:</label>
                            </div>
                            <div class="col-md-8 form-group">
                              <button type="button" id="btnArticulos" class="btn btn-primary me-1 mb-1">Agregar</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive" style="padding: 10px;">
            <table id="tablaVentas" class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>DESCRIPCIÓN ARTÍCULO</th>
                  <th>MARCA</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>IMPORTE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="tr">

              </tbody>
            </table>
          </div>
          <div class="table-responsive" style="padding: 50px 10px 10px 50%;">
            <table class="table table-bordered mb-0">
              <tbody>
                <tr>
                  <td style="font-weight: 1000; text-align: center">SUBTOTAL</td>
                  <td id="subtotal" style="text-align: center">$0</td>
                </tr>
                <tr>
                  <td style="font-weight: 1000; text-align: center">IVA</td>
                  <td id="iva" style="text-align: center">$0</td>
                </tr>
                <tr>
                  <td style="font-weight: 1000; text-align: center">TOTAL</td>
                  <td id="total" style="text-align: center">$0</td>
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
<?php echo view('modal');?>
<!-- End Modal Clientes -->
