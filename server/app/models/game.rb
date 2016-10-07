class Game < ApplicationRecord

  scope :not_over, -> { where(over: false) }

  serialize :player_board, Board
  serialize :cpu_board, Board

  validate :players_have_all_ships

  belongs_to :user

  #phases
  GUESS = "GUESS"
  OVER = "OVER"

  def self.from_player_cells(board_cells)
    Game.new(
      player_board: Board.new(board_cells),
      cpu_board: Board.with_cpu_ships,
      phase: GUESS,
    )
  end

  def guess(coordinate)
    cpu_board.guess(coordinate)
    check_if_game_is_over
    return if over?
    player_board.auto_guess
    check_if_game_is_over
  end

  def cpu_guess
    cell = cell_at_coordinate(coordinate)
    cell[:destroyed] = true
    player_board.set_cell_at_coordinate(coordinate, cell)
  end

  def check_if_game_is_over
    [:player_board, :cpu_board].each do |board|
      if self.send(board).cell_coordinates_where(ship: true, destroyed: false).length == 0
        self.over = true
        self.won = (board == :cpu_board)
        self.phase = OVER
      end
    end
  end

  def players_have_all_ships
    [:player_board, :cpu_board].each do |board|
      errors.add(board, "#{board} does not have #{Board::NUMBER_OF_SHIPS} ships") unless self.send(board).cell_coordinates_where(ship: true).count == Board::NUMBER_OF_SHIPS
    end
  end

end
