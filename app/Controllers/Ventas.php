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

	public function datos($tipo)
	{
		$result = $this->ventas_model->getDatos($tipo);
		echo json_encode($result);
	}

	public function venta()
	{
		$data = $this->request->getGet('data');
		$result = $this->ventas_model->calcularVenta($data);
		echo json_encode($result);
	}

	public function registrar($id)
	{
		$data = $this->request->getGet('data');
		$calculos = $this->ventas_model->calcularVenta($data);
		$result = $this->ventas_model->registrarVenta($id, $calculos);
		echo json_encode($result);
	}
}
