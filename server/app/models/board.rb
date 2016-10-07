class Board
  
  #TODO: download library make DEFAULT_CELL immutable
  DEFAULT_CELL = {
    ship: false,
    enemy: false,
    destroyed: false,
  }

  NUMBER_OF_SHIPS = 5

  attr_accessor :cells

  def self.with_cpu_ships
    board = Board.new
    board.cell_coordinates_where(ship: false).shuffle.first(NUMBER_OF_SHIPS).each do |coordinate|
      board.set_cell_at_coordinate(coordinate, {ship: true, destroyed: false})
    end
    board
  end

  def initialize(board_cells = nil)
    board_cells ||= 5.times.collect { 5.times.collect { DEFAULT_CELL.dup } }
    self.cells = board_cells.map! do |board_row|
      board_row.map! do |board_cell|
        #keys to symbols
        board_cell = board_cell.to_h.to_a.map! {|key, value| [key.to_sym, value]}.to_h
        #clean empy values
        DEFAULT_CELL.merge(board_cell)
      end
    end
  end

  def cell_coordinates_where(test)
    (0...5).to_a.repeated_permutation(2).select do |coordinate|
      cell = cell_at_coordinate(coordinate)
      cell.to_a.all? {|key, value| !test.has_key?(key) || test[key] == value}
    end
  end

  def cell_at_coordinate(coordinate)
    cells[coordinate[1]][coordinate[0]].dup
  end

  def set_cell_at_coordinate(coordinate, cell)
    cells[coordinate[1]][coordinate[0]] = cell
  end

  def whitelist_board(whitelist)
    cells.map.with_index do |row, row_index|
      row.map.with_index do |cell, cell_index|
        whitelist.include?([cell_index, row_index]) ? cell : DEFAULT_CELL.dup
      end
    end
  end

  def guess(coordinate)
    cell = cell_at_coordinate(coordinate)
    cell[:destroyed] = true
    set_cell_at_coordinate(coordinate, cell)
  end

  def auto_guess
    guess(cell_coordinates_where({destroyed: false}).sample)
  end

  #front end has access to a censored board
  def censor_hidden_ships
    whitelist_board(
      cell_coordinates_where({ship: false}) +
      cell_coordinates_where({ship: true, destroyed: true})
    )
  end

  def marshal_dump
    self.cells
  end

  def marshal_load(cells)
    this.cells = cells
  end

end
