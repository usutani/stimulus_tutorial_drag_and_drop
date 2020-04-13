Rails.application.routes.draw do
  resources :books do
    patch 'row_order', on: :collection
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
