<?php

namespace App\Http\Controllers\Api;

use App\Models\Shop\Category;
use App\Models\Shop\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /***
     * 所有分类
     * @return mixed
     */
    public function category()
    {
        $categories = Category::all_categories();

//        $categories = Category::with('children')->where('parent_id', 0)->get();
        return $categories;
    }

    /***
     * 商品详情
     * @param $id
     */
    public function show($id)
    {
        //查出当前要查看的商品
        $product = Product::with('product_galleries')->find($id);

        //为您推荐
        $recommends = Product::where('is_recommend', '<>', 0)->get();
        return response()->json(compact('product', 'recommends'));
    }
}
