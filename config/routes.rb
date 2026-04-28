Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # Employees
  resources :employees, constraints: { id: /\d+/ }
  get  'employees/treeview',  to: 'employees#treeview'
  delete 'employees/destroy_all', to: 'employees#destroy_all', as: 'employees_destroy_all'
  get  'employees/:id/direct_reports', to: 'employees#direct_reports', as: 'direct_reports'
  post 'employees/import_csv', to: 'employees#import_csv', as: 'import_csv_employees'
  post 'employees/import_csv_contractors', to: 'employees#import_csv_contractors', as: 'import_csv_contractors'
  post 'employees/populate_job_families', to: 'employees#populate_job_families', as: 'populate_job_families'

  # Teams
  resources :teams, constraints: { id: /\d+/ }
  post 'teams/build_all_teams_stats', to: 'teams#build_all_teams_stats', as: 'build_all_teams_stats'
  get  'teams/treeview',             to: 'teams#treeview',              as: 'teams_treeview'
  get  'teams/:id/sub_teams',        to: 'teams#sub_teams',             as: 'sub_teams'
  get  'teams/:id/team_members',     to: 'teams#team_members',          as: 'team_members'
  get  'teams/:id/move_candidates',  to: 'teams#move_candidates',       as: 'move_candidates'
  patch 'teams/:id/move',            to: 'teams#move',                  as: 'move_team'

  # Reports
  get 'reports/roles',              to: 'reports#roles'
  get 'reports/title_density',      to: 'reports#title_density'
  get 'reports/job_code_density',   to: 'reports#job_code_density'
  get 'reports/seniority',          to: 'reports#seniority'
  get 'reports/job_code',           to: 'reports#job_code'
  get 'reports/employee_country',   to: 'reports#employee_country'
  get 'reports/personnel_area',     to: 'reports#personnel_area'
  get 'reports/company',            to: 'reports#company'
  get 'reports/job_family',         to: 'reports#job_family'
  get 'reports/individual_contributors', to: 'reports#individual_contributors'
  get 'reports/management_ratios',  to: 'reports#management_ratios'
  get 'reports/team_depth',         to: 'reports#team_depth'
  get 'reports/team_size',          to: 'reports#team_size'
  get 'reports/team_health',        to: 'reports#team_health'
  get 'reports/team_health_details', to: 'reports#team_health_details'
  get 'reports/team_children',      to: 'reports#team_children'
  get 'reports/team_members_managers', to: 'reports#team_members_managers'

  # Data Versions
  resources :data_versions do
    member do
      patch :activate
      patch :archive
    end
  end

  root "home#index"
end
