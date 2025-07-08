module CbaRolesGenerator
  extend ActiveSupport::Concern

  def build_cba_roles_list
    Role.delete_all

    roles_data = Emp.select(
      "workday_job_family AS job_family",
      "workday_job_profile AS job_sub_family",
      "position_title AS role",
      "IF( person_id IN (select manager_id from emp), 1, 0) as is_manager",
      "management_level AS seniority"
    ).group(
      "workday_job_family, workday_job_profile, position_title, person_id, management_level"
    )

    new_roles = roles_data.map do |role_data|
      seniority = get_seniority_from_management_level(role_data.seniority)
      job_function_group = role_data.job_family || "Unknown"
      job_function = role_data.job_sub_family || "Unknown"

      [
        job_function_group,
        job_function,
        role_data.role,
        role_data.is_manager,
        seniority
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


  private
  def get_seniority_from_management_level(mgmt_level)
    if mgmt_level.nil? ||
        mgmt_level.strip.empty? ||
        mgmt_level.length < 7
      return 0
    end
    return mgmt_level[6].to_i
  end
end

