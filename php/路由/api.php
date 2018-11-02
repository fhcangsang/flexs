<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//接口路由
Route::namespace('Api')->group(function () {
    //首页
    $this->get('/', 'HomeController@index');

    //商品、分类
    Route::prefix('product')->group(function () {
        //分类
        $this->get('category', 'ProductController@category');

        //商品详情
        $this->get('{id}', 'ProductController@show');

    });
});