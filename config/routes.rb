Rails.application.routes.draw do
  get 'reports/roles'
  get 'reports/seniority'
  resources :roles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :employees, constraints: { id: /\d+/ }

  get 'employees/structure', to: 'employees#structure'
  get 'employees/treeview', to: 'employees#treeview'
  get 'employees/treeview2', to: 'employees#treeview2'
  post 'employees/create_samples', to: 'employees#create_samples'
  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'
  get 'employees/:id/direct_reports', to: 'employees#direct_reports', as: 'direct_reports'

  resources :roles, constraints: { id: /\d+/ }

  get 'reports/roles', to: 'reports#roles'
  get 'reports/seniority', to: 'reports#seniority'
  get 'reports/job_function', to: 'reports#job_function'

  # Defines the root path route ("/")
  root "employees#index"
end
