<?php

namespace App\Controllers;

use App\Models\InicioModel;

class Inicio extends BaseController
{
	public function __construct()
	{
		$this->inicio_model = new InicioModel();
	}

	public function index()
	{
		$data['titulo'] = 'Listado de Ventas';
		echo view('header', $data);
		$data['ventas'] = $this->inicio_model->getVentas();
		echo view('inicio', $data);
		echo view('footer');
	}
}
