Rails.application.routes.draw do
  get 'reports/roles'
  get 'reports/seniority'
  resources :roles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Employees
  resources :employees, constraints: { id: /\d+/ }
  get 'employees/structure', to: 'employees#structure'
  get 'employees/treeview', to: 'employees#treeview'
  get 'employees/treeview2', to: 'employees#treeview2'
  post 'employees/create_samples', to: 'employees#create_samples'
  post 'employees/build_cba_list', to: 'employees#build_cba_list'
  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'
  get 'employees/:id/direct_reports', to: 'employees#direct_reports', as: 'direct_reports'
  post 'employees/import_csv', to: 'employees#import_csv', as: 'import_csv_employees'

  # Roles
  resources :roles, constraints: { id: /\d+/ }

  # Reports
  get 'reports/roles', to: 'reports#roles'
  get 'reports/seniority', to: 'reports#seniority'
  get 'reports/job_function', to: 'reports#job_function'
  get 'reports/job_function_group', to: 'reports#job_function_group'
  get 'reports/employee_allocations', to: 'reports#employee_allocations'
  get 'reports/employee_tenure', to: 'reports#employee_tenure'
  get 'reports/employee_country_tenure', to: 'reports#employee_country_tenure'
  get 'reports/employee_country', to: 'reports#employee_country'
  get 'reports/employee_worker_type', to: 'reports#employee_worker_type'
  get 'reports/employee_country_worker_type', to: 'reports#employee_country_worker_type'
  get 'reports/management_ratios', to: 'reports#management_ratios'
  get 'reports/retail_tech_org_sizes', to: 'reports#retail_tech_org_sizes'
  get 'reports/team_geos', to: 'reports#team_geos'
  get 'reports/squad_children', to: 'reports#squad_children'
  get 'reports/squad_depth', to: 'reports#squad_depth'
  get 'reports/squad_members_managers', to: 'reports#squad_members_managers'
  get 'reports/squad_size', to: 'reports#squad_size'
  get 'reports/squad_health', to: 'reports#squad_health'
  get 'reports/squad_health_details', to: 'reports#squad_health_details'

  # Squads
  resources :squads, constraints: { id: /\d+/ }
  post 'squads/build_cba_squads_list', to: 'squads#build_cba_squads_list'
  post 'squads/build_squads_stats', to: 'squads#build_squads_stats'
  get 'squads/treeview', to: 'squads#treeview'
  get 'squads/:id/sub_teams', to: 'squads#sub_teams', as: 'sub_teams'
  delete 'squads/destroy_all', to: 'squads#destroy_all', as: 'squads_destroy_all'
  get 'squads/:id/squad_members', to: 'squads#squad_members', as: 'squad_members'

  # Defines the root path route ("/")
  root "home#index"
end
