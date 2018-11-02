<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //每个商品有很多相册
    public function product_galleries()
    {
        return $this->hasMany('App\Models\Shop\ProductGallery');
    }
}
