<?php


//Route::get('/', function () {    //闭包函数的写法；
//    return view('welcome');
//});
$this->delete('blogs/deleteComment/{blog}', 'blogController@deleteComment')->name('blogs.deleteComment');
$this->post('blogs/storeComment', 'blogController@storeComment')->name('blogs.storeComment');
$this->resource('blogs', 'blogController');
