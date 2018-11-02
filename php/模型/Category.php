<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //每个一级分类有很多二级分类
    public function children()
    {
        return $this->hasMany('App\Models\Shop\Category', 'parent_id', 'id');
    }


    static function all_categories()
    {
        $categories = self::where('parent_id', 0)->get();
        foreach ($categories as $key => $value) {
            $id = $value['id'];
            $children = self::where('parent_id', $id)->get();
            $categories[$key]['children'] = $children;
        }
        return $categories;
    }
}
