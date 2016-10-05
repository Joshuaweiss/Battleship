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

  def update
    game = current_user.games.not_over.first
    if game.update(update_params)
      render json: game
    else
      raise "CHECK"
      #render 402
    end
  end

  def create_params
    params.require(:game).permit(:phase, board: [:ship, :enemy, :destroyed])
  end

  def update_params
    params.require(:game).permit(guess: [])
  end

end
