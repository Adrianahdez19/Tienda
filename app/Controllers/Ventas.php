<?php

namespace App\Controllers;

use App\Models\VentasModel;

class Ventas extends BaseController
{
	public function __construct()
	{
		$this->ventas_model = new VentasModel();
	}

	public function index()
	{
		$data['titulo'] = 'Nueva Venta';
		echo view('header', $data);
		echo view('ventas');
		echo view('footer');
	}
}
