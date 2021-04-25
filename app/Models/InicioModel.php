<?php namespace App\Models;

use CodeIgniter\Model;

class InicioModel extends Model
{
  public function getVentas()
  {
    $query = $this->db->query("SELECT FolioVenta, clientes_Id as idCliente, Total, Nombre, Apellidos, Fecha  FROM ventas
      INNER JOIN detalleventa ON ventas.FolioVenta=detalleventa.ventas_FolioVenta
      INNER JOIN clientes ON ventas.clientes_Id=clientes.Id");
      $data = $query->getResult();
      if($data) return $data;
      else return false;
    }
  }
