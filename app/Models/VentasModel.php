<?php namespace App\Models;

use CodeIgniter\Model;

class VentasModel extends Model
{
  public function getDatos($tipo)
  {
    $query = $this->db->query('SELECT * FROM ' . $tipo . ';');
    $data = $query->getResult();
    if($data) return $data;
    else return false;
  }
}
