<?php

namespace App\Http\Controllers\Api;

use App\Models\Shop\Advert;
use App\Models\Shop\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        $adverts = Advert::where('category_id', true)->orderBy('sort_order', 'desc')->get();
        $banners = Advert::where('category_id', 2)->orderBy('sort_order', 'desc')->get();

        $products = Product::where('is_onsale', true)->orderBy('sort_order', 'desc')->get();

        return response()->json(compact('adverts', 'banners', 'products'));
    }
}
