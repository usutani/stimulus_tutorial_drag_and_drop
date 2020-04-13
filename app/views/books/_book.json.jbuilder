json.extract! book, :id, :title, :row_order, :created_at, :updated_at
json.url book_url(book, format: :json)
