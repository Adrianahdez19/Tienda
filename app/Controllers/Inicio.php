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
		// $clientes = $this->home_model->getClientes();
		// $data['clientes'] = $clientes;
		// echo view('header');
		// $data['ventas'] = $this->home_model->getVentas();
		echo view('inicio');
		echo view('footer');
		// echo view('footer');
	}

	// public function nuevaVenta()
	// {
	// 	// echo view('header');
	// 	$data['ventas'] = $this->home_model->addVenta();
	// 	// echo view('home', $data);
	// 	var_dump($data['ventas']);
	// 	// echo view('footer');
	// }
}
