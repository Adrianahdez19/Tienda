<?php namespace App\Models;

use CodeIgniter\Model;

class VentasModel extends Model
{
  public function getDatos($tipo)
  {
    $query = $this->db->query('SELECT * FROM ' . $tipo);
    $data = $query->getResult();
    if($data) return $data;
    else return false;
  }

  public function calcularVenta()
  {
    $json = $request->getJSON();
    return $json;
    // $cantidad = 2;
    // $articulos = array(1, 2);
    // $query = $this->db->query('SELECT * FROM articulos WHERE Id IN (1, 2)');
    // $data = $query->getResultArray();
    // foreach ($data as $articulo) {
    //   $importe = floatval($data->Precio) * floatval($cantidad);
    //   $subtotal =
    //   return $importe;
    //   $result[$articulo['Id']] = $articulo['Nombre'];
    // }
    // return $result;



    // if($data) {

    // }
    // else return false;
  }
}
