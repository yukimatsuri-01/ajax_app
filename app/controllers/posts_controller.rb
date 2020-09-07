class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content], checked: false)
    render jason: {post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id]) #更新したレコードを取得し直す
    render json: { post: item } #上記をJSON形式でchecked.jsに返却
  end
end
