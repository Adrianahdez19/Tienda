<!-- Inicio -->
<section class="section">
  <div class="row" id="table-bordered">
    <div class="col-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body">
            <div class="col-sm-12 d-flex justify-content-end">
              <a type="button" id="btnNuevaVenta" href="/ventas" class="btn btn-primary me-1 mb-1">Nueva venta</a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>FOLIO VENTA</th>
                  <th>NO. CLIENTE</th>
                  <th>NOMBRE</th>
                  <th>TOTAL</th>
                  <th>FECHA</th>
                </tr>
              </thead>
              <tbody>
                <?php
                if(!empty($ventas)):
                  foreach ($ventas as $key => $value):
                    ?>
                    <tr>
                      <td style="text-align: center;">000<?php echo $ventas[$key]->FolioVenta ?></td>
                      <td style="text-align: center;"><?php echo $ventas[$key]->idCliente ?></td>
                      <td style="text-align: center;"><?php echo $ventas[$key]->Nombre . " " . $ventas[$key]->Apellidos ?></td>
                      <td style="text-align: center;">$<?php echo $ventas[$key]->Total ?></td>
                      <td style="text-align: center;"><?php echo date("d-m-Y", strtotime($ventas[$key]->Fecha)) ?></td>
                    </tr>
                    <?php
                  endforeach;
                endif;
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End Inicio -->
