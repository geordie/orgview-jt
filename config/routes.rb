Rails.application.routes.draw do
  resources :roles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :employees, constraints: { id: /\d+/ }

  get 'employees/structure', to: 'employees#structure'
  post 'employees/create_samples', to: 'employees#create_samples'
  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'

  resources :roles, constraints: { id: /\d+/ }

  # Defines the root path route ("/")
  root "employees#index"
end
