<?php

namespace App\Http\Controllers;

use App\Article;
use App\Category;
use App\Comment;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::all();
        $news = Article::orderBy('created_at','desc')->take(2)->get();
        $newComment = Comment::orderBy('created_at','desc')->take(2)->get();
        $categories = Category::all();
        $articles = Article::with('category')->orderBy('created_at','desc')->get();   //查询表articles的所有数据和所属分类；
//        return response()->json($articles);     //写成接口；
        return view('blog.index',compact('articles','news','newComment','comments','categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
//        return $categories;
        return view('blog.add',compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $request->all();
//        return $request;
        Article::create($request->all());
        return redirect('/blogs');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Article::where('id',$id)->increment('views');
        $content = Article::find($id);
        $comments = Comment::where('article_id',$id)->get();
        return view('/blog.show',compact('content'),compact('comments'));
    }

    public function storeComment(Request $request)
    {
        Comment::create($request->all());
//        return $request->all();
        return back();
    }

    public function deleteComment($id)
    {
        Comment::destroy($id);
        return "删除成功";
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {   $article = Article::find($id);
        $category = Category::all();
        return view('blog.edit',compact('article'),compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
//        $request->all();
//        return $request;
        $article = Article::find($id);
        $article->update($request->all());
        return redirect('/blogs');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Article::destroy($id);
        return "删除成功";
    }
}
