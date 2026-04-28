module JobFamilyProcessor
  extend ActiveSupport::Concern

  def populate_job_families
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    scope = Employee.where(data_version_id: current_version.id)

    updated = 0
    updated += scope.where("LOWER(title) LIKE 'software engineer%'").update_all(job_family: 'Software Engineering')
    updated += scope.where("LOWER(title) LIKE 'infrastructure engineer%'").update_all(job_family: 'Infrastructure Engineering')
    updated += scope.where("LOWER(title) LIKE 'infrastructure administrator%'").update_all(job_family: 'Infrastructure Administration')
    updated += scope.where("LOWER(title) LIKE 'network engineer%'").update_all(job_family: 'Network Engineering')
    updated += scope.where("LOWER(title) LIKE 'software administrator%' OR LOWER(title) LIKE 'system administrator%'").update_all(job_family: 'Software & System Administration')
    updated += scope.where("(LOWER(title) LIKE '%dir%' OR LOWER(title) LIKE '%mgr%') AND LOWER(title) LIKE '%engineering%'").update_all(job_family: 'Engineering Management')
    updated += scope.where("LOWER(title) LIKE '%analyst%'").update_all(job_family: 'Business Analysis')

    redirect_to root_path, notice: "Job families populated: #{updated} employee(s) updated."
  end
end
