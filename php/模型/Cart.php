<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //黑名单
    protected $guarded = [];

    //屏蔽时间
    public $timestamps = false;

    public function product()
    {
        return $this->belongsTo('App\Models\Shop\Product');
    }

    /***
     * 计算购物车数据
     * @param null $carts
     * @return array
     */
    static function count_cart($carts = null)
    {
        $count = [];
        $carts = $carts ? $carts : Cart::with('product')->where('customer_id', 11)->get();

        $num = 0;
        $total_price = 0;
        foreach ($carts as $v) {
            $total_price += $v->product->price * $v->num;
            $num += $v->num;
        }
        $count['total_price'] = $total_price;
        $count['num'] = $num;

        return $count;
    }

    static function all_carts()
    {
        $carts = Cart::with('product')->where('customer_id', 11)->get();
        $count = Cart::count_cart($carts);
        return response()->json(compact('carts', 'count'));
    }
}
