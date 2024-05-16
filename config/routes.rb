Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :employees, constraints: { id: /\d+/ }

  post 'employees/create_samples', to: 'employees#create_samples'

  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'

  # Defines the root path route ("/")
  # root "posts#index"
end
