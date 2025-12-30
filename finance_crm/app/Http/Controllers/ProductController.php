<?php

namespace App\Http\Controllers;

use App\Services\ProductService;

class ProductController extends BaseController
{
    public function __construct(ProductService $service)
    {
        parent::__construct($service);
    }
}