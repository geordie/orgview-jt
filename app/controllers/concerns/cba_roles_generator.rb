module CbaRolesGenerator
  extend ActiveSupport::Concern

  def build_cba_roles_list
    Role.delete_all

    roles_data = Emp.select(
      "workday_job_family_group AS job_family",
      "workday_job_family AS job_sub_family",
      "IF( workday_job_profile IS NULL, position_title, workday_job_profile) AS role",
      "IF( is_manager = 'Yes', 1, 0) as is_manager",
      "seniority"
    ).group(
      "workday_job_family_group, workday_job_family, role, is_manager, seniority"
    )

    new_roles = roles_data.map do |role_data|
      job_function_group = role_data.job_family || "Unknown"
      job_function = role_data.job_sub_family || "Unknown"

      [
        job_function_group,
        job_function,
        role_data.role,
        role_data.is_manager,
        role_data.seniority
      ]
    end

    Role.insert_all(
      new_roles.map do |job_function_group, job_function, role, is_manager, seniority|
        {
          job_function_group: job_function_group,
          job_function: job_function,
          role: role,
          is_manager: is_manager,
          seniority: seniority
        }
      end
    ) if new_roles.any?

    redirect_to root_path, notice: 'CBA roles created successfully.'
  end
end

