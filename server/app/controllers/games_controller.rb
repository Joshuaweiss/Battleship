require "byebug"

class GamesController < ApplicationController
  
  def show
    game = current_user.games.not_over.first
    render json: game
  end

  def create
    game = Game.from_board(create_params[:board].each_slice(5).to_a)
    game.user = current_user
    if game.save
      render json: game
    else
      render json: game.errors.full_messages, status: 422
    end
  end

  def update
    game = current_user.games.not_over.first
    if game.update(update_params)
      render json: game
    else
      render json: game.errors.full_messages, status: 422
    end
  end

  def destroy
    game = current_user.games.not_over.first
    render json: nil, status: 422 and return unless game
    game.destroy
    render json: nil
  end

  def create_params
    params.require(:game).permit(:phase, board: [:ship, :enemy, :destroyed])
  end

  def update_params
    params.require(:game).permit(guess: [])
  end

end
