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
  post 'employees/build_cba_list', to: 'employees#build_cba_list'
  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'
  get 'employees/:id/direct_reports', to: 'employees#direct_reports', as: 'direct_reports'

  resources :roles, constraints: { id: /\d+/ }

  get 'reports/roles', to: 'reports#roles'
  get 'reports/seniority', to: 'reports#seniority'
  get 'reports/job_function', to: 'reports#job_function'
  get 'reports/job_function_group', to: 'reports#job_function_group'

  resources :squads, constraints: { id: /\d+/ }
  post 'squads/build_cba_squads_list', to: 'squads#build_cba_squads_list'
  delete 'squads/destroy_all', to: 'squads#destroy_all', as: 'squads_destroy_all'

  # Defines the root path route ("/")
  root "employees#index"
end
