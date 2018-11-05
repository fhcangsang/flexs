<?php

namespace App\Http\Controllers\Api;

use App\Models\Shop\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /***
     * 购物车首页
     */
    public function index()
    {
        //查出当前用户的购物车所有信息
        return Cart::all_carts();
    }

    /***
     * 加入购物车
     * @param Request $request
     */
    public function store(Request $request)
    {
        $product_id = $request->product_id;

        $cart = Cart::where('product_id', $product_id)->where('customer_id', 11)->first();
        if ($cart) {
            Cart::where('id', $cart->id)->increment('num');
            return;
        }
        Cart::create([
            'product_id' => $product_id,
            'customer_id' => 11,
            'num' => 1,
        ]);
    }

    /***
     * 改变数量
     * @param Request $request
     */
    public function change_num(Request $request)
    {
        if ($request->type == 'add') {
            Cart::where('id', $request->id)->increment('num');
        } else {
            Cart::where('id', $request->id)->decrement('num');
        }

        return Cart::all_carts();
    }
}
