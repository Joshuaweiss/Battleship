require "byebug"

class GamesController < ApplicationController
  
  def show
    game = current_user.games.not_over.first
    render json: game
  end

  def create
    game = Game.from_board(create_params[:board].each_slice(5).to_a)
    game.user = current_user
    game.save
    render json: game
  end

  def create_params
    params.require(:game).permit(:phase, board: [:ship, :enemy, :destroyed])
  end

end
