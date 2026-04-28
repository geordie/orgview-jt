module JobFamilyProcessor
  extend ActiveSupport::Concern

  def populate_job_families
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    scope = Employee.where(data_version_id: current_version.id)

    updated = 0
    updated += scope.where("LOWER(title) LIKE 'software engineer%'").update_all(job_family: 'Software Engineering')
    updated += scope.where("LOWER(title) LIKE 'infrastructure engineer%'").update_all(job_family: 'Infrastructure Engineering')

    redirect_to root_path, notice: "Job families populated: #{updated} employee(s) updated."
  end
end
