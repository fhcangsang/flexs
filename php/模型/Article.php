<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //定义黑名单，允许表中所有字段都能插入或更新；
//    protected $guarded = [];
    //定义白名单，只允许表中有的字段插入或更新；  一般使用白名单安全性较好；
    protected $fillable = [
        'title', 'content','category_id','views',
    ];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

}
