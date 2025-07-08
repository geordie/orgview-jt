module EmployeeCsvImporter
  extend ActiveSupport::Concern

  require 'csv'
  require Rails.root.join('app/lib/cba_utils')

  include CbaUtils

  EXPECTED_CSV_HEADERS = [
    "Person ID",
    "First Name",
    "Surname",
    "Worker Type",
    "Worker Sub-Type",
    "City",
    "State",
    "Country",
    "FTE",
    "Management Level",
    "PACE Role",
    "Workday Position ID",
    "Position Title",
    "Workday Job Family Group",
    "Workday Job Family",
    "Workday Job Profile",
    "Workday Job Profile ID",
    "Is Manager",
    "Company",
    "Manager ID",
    "Manager Name",
    "Manager Position ID",
    "Supply Team - name",
    "Supply Team - type",
    "Supply Team - Layer in the org",
    "Chapter Area",
    "Chapter",
    "PACE Supervisory Org Business Unit",
    "PACE Supervisory Org 2",
    "PACE Supervisory Org 3",
    "PACE Supervisory Org 4",
    "PACE Supervisory Org 5",
    "PACE Supervisory Org 6",
    "PACE Supervisory Org 7",
    "Demand team - type",
    "Demand team - name",
    "Demand team - pattern",
    "Demand team - layer in the org",
    "Demand team - Business Unit",
    "Demand team - Domain L1",
    "Demand team - Domain L2",
    "Demand team - Domain L3",
    "Demand team - Crew/COE",
    "Demand team - Squad/COE Team",
    "Allocated FTE",
    "Cost Center ID",
    "Cost Center Business Unit",
    "Extended Leave",
    "Workday Supervisory Org Business Unit",
    "Workday Supervisory Org 2",
    "Workday Supervisory Org 3",
    "Workday Supervisory Org 4",
    "Workday Supervisory Org 5",
    "Workday Supervisory Org 6",
    "Workday Supervisory Org 7",
    "Workday Supervisory Org 8",
    "Is allocated to a Supply Structure?",
    "Is allocated to a Demand structure?",
    "ETP Role Type",
    "ETP Initiative",
    "Date person was added to TeamForm",
    "Demand allocation start date",
    "Demand allocation last updated",
    "demand team - id",
    "supply team - id"
  ].freeze

  def import_csv_file(uploaded_file)
    unless uploaded_file.content_type == 'text/csv'
      flash[:alert] = "Please upload a valid CSV file."
      redirect_to root_path and return
    end
    if uploaded_file.size == 0
      flash[:alert] = "The uploaded file is empty."
      redirect_to root_path and return
    end
    if uploaded_file.size > 58.megabytes
      flash[:alert] = "The uploaded file is too large. Please upload a file smaller than 58MB."
      redirect_to root_path and return
    end

    temp_file = File.join(Rails.root, 'tmp', uploaded_file.original_filename)
    File.open(temp_file, "wb") { |file| file.write(uploaded_file.read) }

    process_csv(temp_file)
    File.delete(temp_file) if File.exist?(temp_file)
    #redirect_to root_path, notice: 'CSV import complete.'
  end

  def process_csv(temp_file)
    uploaded_csv = nil
    begin
      uploaded_csv = CSV.read(temp_file, encoding: 'bom|utf-8', headers: true)
    rescue CSV::MalformedCSVError
      flash[:alert] = "The uploaded file is not a valid CSV file. Please check the file and try again."
      redirect_to root_path and return
    end

    uploaded_headers = uploaded_csv.headers
    p '*******'
    p uploaded_headers
    p '*******'

    missing_headers = EXPECTED_CSV_HEADERS.reject { |header| uploaded_headers.include?(header) }
    if missing_headers.any?
      flash[:alert] = "The uploaded file is missing the following headers: #{missing_headers.join(', ')}. Please check the file and try again."
      redirect_to root_path and return
    end

    employees_cache = Emp.all.pluck(:person_id)
    batch = []
    batch_size = 5000

    uploaded_csv.each do |row|
      raw_person_id = row["Person ID"] # Assuming "Person ID" is the first column
      next if employees_cache.include?(raw_person_id)
      if batch.size % 1000 == 5
        p "Processing record #{batch.size + 1} with Person ID: #{raw_person_id}"
      end
      seniority = get_seniority_from_management_level(row["Management Level"])
      batch << {
        person_id: raw_person_id,
        first_name: row["First Name"],
        surname: row["Surname"],
        worker_type: row["Worker Type"],
        worker_sub_type: row["Worker Sub-Type"],
        city: row["City"],
        state: row["State"],
        country: row["Country"],
        fte: row["FTE"],
        management_level: row["Management Level"],
        pace_role: row["PACE Role"],
        workday_position_id: row["Workday Position ID"],
        position_title: row["Position Title"],
        workday_job_family_group: row["Workday Job Family Group"],
        workday_job_family: row["Workday Job Family"],
        workday_job_profile: row["Workday Job Profile"],
        workday_job_profile_id: row["Workday Job Profile ID"],
        is_manager: row["Is Manager"],
        company: row["Company"],
        manager_id: row["Manager ID"],
        manager_name: row["Manager Name"],
        manager_position_id: row["Manager Position ID"],
        supply_team_name: row["Supply Team - name"],
        supply_team_type: row["Supply Team - type"],
        supply_team_layer_in_the_org: row["Supply Team - Layer in the org"],
        chapter_area: row["Chapter Area"],
        chapter: row["Chapter"],
        pace_supervisory_org_business_unit: row["PACE Supervisory Org Business Unit"],
        pace_supervisory_org_2: row["PACE Supervisory Org 2"],
        pace_supervisory_org_3: row["PACE Supervisory Org 3"],
        pace_supervisory_org_4: row["PACE Supervisory Org 4"],
        pace_supervisory_org_5: row["PACE Supervisory Org 5"],
        pace_supervisory_org_6: row["PACE Supervisory Org 6"],
        pace_supervisory_org_7: row["PACE Supervisory Org 7"],
        demand_team_type: row["Demand team - type"],
        demand_team_name: row["Demand team - name"],
        demand_team_pattern: row["Demand team - pattern"],
        demand_team_layer_in_the_org: row["Demand team - layer in the org"],
        demand_team_business_unit: row["Demand team - Business Unit"],
        demand_team_domain_l1: row["Demand team - Domain L1"],
        demand_team_domain_l2: row["Demand team - Domain L2"],
        demand_team_domain_l3: row["Demand team - Domain L3"],
        demand_team_crew_coe: row["Demand team - Crew/COE"],
        demand_team_squad_coe_team: row["Demand team - Squad/COE Team"],
        allocated_fte: row["Allocated FTE"],
        cost_center_id: row["Cost Center ID"],
        cost_center_business_unit: row["Cost Center Business Unit"],
        extended_leave: row["Extended Leave"],
        workday_supervisory_org_business_unit: row["Workday Supervisory Org Business Unit"],
        workday_supervisory_org_2: row["Workday Supervisory Org 2"],
        workday_supervisory_org_3: row["Workday Supervisory Org 3"],
        workday_supervisory_org_4: row["Workday Supervisory Org 4"],
        workday_supervisory_org_5: row["Workday Supervisory Org 5"],
        workday_supervisory_org_6: row["Workday Supervisory Org 6"],
        workday_supervisory_org_7: row["Workday Supervisory Org 7"],
        workday_supervisory_org_8: row["Workday Supervisory Org 8"],
        is_allocated_to_a_supply_structure: row["Is allocated to a Supply Structure?"],
        is_allocated_to_a_demand_structure: row["Is allocated to a Demand structure?"],
        etp_role_type: row["ETP Role Type"],
        etp_initiative: row["ETP Initiative"],
        date_person_was_added_to_teamform: row["Date person was added to TeamForm"],
        demand_allocation_start_date: row["Demand allocation start date"],
        demand_allocation_last_updated: row["Demand allocation last updated"],
        demand_team_id: row["demand team - id"],
        supply_team_id: row["supply team - id"],
        seniority: seniority
      }
      if batch.size >= batch_size
        begin
          Emp.insert_all!(batch)
        rescue ActiveRecord::RecordInvalid => e
          flash[:alert] = "Error creating records in batch: #{e.message}"
          redirect_to root_path and return
        end
        batch.clear
      end
    end
    # Insert any remaining records
    if batch.any?
      begin
        Emp.insert_all!(batch)
      rescue ActiveRecord::RecordInvalid => e
        flash[:alert] = "Error creating records in batch: #{e.message}"
        redirect_to root_path and return
      end
    end
    flash[:notice] = "CSV file processed successfully. Employees created."
  end

end
