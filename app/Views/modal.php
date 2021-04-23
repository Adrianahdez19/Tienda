<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="modalTitle"><?php echo $tituloModal ?></h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i data-feather="x"></i>
              </button>
          </div>
          <div class="modal-body">
            <?php echo $contenidoModal ?>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                  <i class="bx bx-x d-block d-sm-none"></i>
                  <span class="d-none d-sm-block">Cancelar</span>
              </button>
          </div>
      </div>
  </div>
  </div>
<!-- End Modal -->
