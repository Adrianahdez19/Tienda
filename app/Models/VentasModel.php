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

  public function calcularVenta($data)
  {
    $subtotal = 0;
    $iva = 0;
    $total = 0;
    foreach ($data as $x => $value) {
      $id = $data[$x]['Id'];
      $cantidad = $data[$x]['Cantidad'];
      $query = $this->db->query('SELECT * FROM articulos WHERE Id = ' . $id);
      $data2 = $query->getRow();
      $precio = $data2->Precio;
      $importe = floatval($precio) * intval($cantidad);
      $subtotal = $subtotal + $importe;
    }

    $result['articulos'] = $data;
    $result['subtotal'] = $subtotal;
    $valIVA = 16;
    $iva = floatval($subtotal / 100) * $valIVA;
    $result['iva'] = $iva;
    $result['total'] = $subtotal + $iva;

    return $result;
  }

  public function registrarVenta($idCliente, $data)
  {
    $subtotal = $data['subtotal'];
    $iva = $data['iva'];
    $total = $data['total'];
    $this->db->transStart();
    $this->db->query("INSERT INTO ventas (Subtotal, IVA, Total, Fecha, clientes_Id) VALUES ('" . $subtotal . "','" . $iva . "','" . $total . "','" . date('Y-m-d H:i:s') . "','" . $idCliente . "')");
    $datos = $data['articulos'];
    $folioVenta = $this->db->insertID();
    foreach ($datos as $x => $value) {
      $idArticulo = $datos[$x]['Id'];
      $cantidad = $datos[$x]['Cantidad'];
      $this->db->query("INSERT INTO detalleventa (Cantidad, articulos_Id, ventas_FolioVenta) VALUES ('" . $cantidad . "','" . $idArticulo . "','" . $folioVenta . "')");
    }
    if($this->db->transComplete()) return true;
    else false;
  }
}
