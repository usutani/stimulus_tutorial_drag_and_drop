class Book < ApplicationRecord
  validates :title, :row_order, uniqueness: true
end
