require "byebug"

class GamesController < ApplicationController

  #currently assumes user has only one game
  
  def show
    game = current_user.games.not_over.first
    render json: game
  end

  def create
    board = create_params[:playerBoard]
    render json: nil, status: 422 and return unless board && board.length == 25
    game = Game.from_player_cells(board.each_slice(5).to_a)
    game.user = current_user
    if game.save
      render json: game
    else
      render json: game.errors.full_messages, status: 422
    end
  end

  def update
    game = current_user.games.not_over.first
    render json: nil, status: 422 unless game
    game.guess(update_params[:guess]) if update_params[:guess]
    if game.save
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
    params.require(:game).permit(:phase, playerBoard: [:ship, :enemy, :destroyed])
  end

  def update_params
    params.require(:game).permit(guess: [])
  end

end
