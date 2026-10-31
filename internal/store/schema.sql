CREATE TABLE "schema_migrations" ("version" varchar NOT NULL PRIMARY KEY);
CREATE TABLE "ar_internal_metadata" ("key" varchar NOT NULL PRIMARY KEY, "value" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE TABLE "teams_employees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "team_id" bigint NOT NULL, "employee_id" bigint NOT NULL, "allocation" float DEFAULT NULL, "data_version_id" bigint DEFAULT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, CONSTRAINT "fk_rails_444448fa89"
FOREIGN KEY ("employee_id")
  REFERENCES "employees" ("id")
, CONSTRAINT "fk_rails_3e64674aa8"
FOREIGN KEY ("team_id")
  REFERENCES "teams" ("id")
, CONSTRAINT "fk_rails_4ef28892e2"
FOREIGN KEY ("data_version_id")
  REFERENCES "data_versions" ("id")
);
CREATE INDEX "index_teams_employees_on_team_id" ON "teams_employees" ("team_id");
CREATE INDEX "index_teams_employees_on_employee_id" ON "teams_employees" ("employee_id");
CREATE INDEX "index_teams_employees_on_data_version_id" ON "teams_employees" ("data_version_id");
CREATE INDEX "index_teams_employees_on_data_version_id_and_team_id" ON "teams_employees" ("data_version_id", "team_id");
CREATE INDEX "index_teams_employees_on_data_version_id_and_employee_id" ON "teams_employees" ("data_version_id", "employee_id");
CREATE TABLE "data_versions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar COLLATE "NOCASE" NOT NULL, "description" text COLLATE "NOCASE" DEFAULT NULL, "snapshot_date" datetime(6) NOT NULL, "is_active" boolean DEFAULT 0 NOT NULL, "status" varchar COLLATE "NOCASE" DEFAULT 'draft' NOT NULL, "metadata" json DEFAULT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE UNIQUE INDEX "index_data_versions_on_name" ON "data_versions" ("name");
CREATE INDEX "index_data_versions_on_snapshot_date" ON "data_versions" ("snapshot_date");
CREATE INDEX "index_data_versions_on_is_active" ON "data_versions" ("is_active");
CREATE INDEX "index_data_versions_on_status" ON "data_versions" ("status");
CREATE TABLE "emp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "person_id" varchar COLLATE "NOCASE" NOT NULL, "business_title" varchar COLLATE "NOCASE" DEFAULT NULL, "job_code" varchar COLLATE "NOCASE" DEFAULT NULL, "job_level" varchar COLLATE "NOCASE" DEFAULT NULL, "country" varchar COLLATE "NOCASE" DEFAULT NULL, "personnel_area" varchar COLLATE "NOCASE" DEFAULT NULL, "company" varchar COLLATE "NOCASE" DEFAULT NULL, "org_unit" varchar COLLATE "NOCASE" DEFAULT NULL, "leader_id" varchar COLLATE "NOCASE" DEFAULT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "name" varchar COLLATE "NOCASE" DEFAULT NULL, "job_family" varchar COLLATE "NOCASE" DEFAULT NULL, "is_manager" boolean DEFAULT NULL, "start_date" date DEFAULT NULL);
CREATE INDEX "index_emp_on_person_id" ON "emp" ("person_id");
CREATE TABLE "employees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "person_id" varchar(32) COLLATE "NOCASE" DEFAULT '' NOT NULL, "title" varchar COLLATE "NOCASE" DEFAULT NULL, "job_code" varchar COLLATE "NOCASE" DEFAULT NULL, "job_level" varchar COLLATE "NOCASE" DEFAULT NULL, "seniority" integer DEFAULT NULL, "manager_id" varchar(32) COLLATE "NOCASE" DEFAULT NULL, "is_manager" boolean DEFAULT NULL, "country" varchar COLLATE "NOCASE" DEFAULT NULL, "personnel_area" varchar COLLATE "NOCASE" DEFAULT NULL, "company" varchar COLLATE "NOCASE" DEFAULT NULL, "data_version_id" bigint DEFAULT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "name" varchar COLLATE "NOCASE" DEFAULT NULL, "job_family" varchar COLLATE "NOCASE" DEFAULT NULL, "employee_type" varchar COLLATE "NOCASE" DEFAULT NULL, "start_date" date DEFAULT NULL, CONSTRAINT "fk_rails_6f9611294a"
FOREIGN KEY ("data_version_id")
  REFERENCES "data_versions" ("id")
, CONSTRAINT chk_employees_employee_type CHECK (employee_type IN ('FTE', 'FTC')));
CREATE INDEX "index_employees_on_data_version_id" ON "employees" ("data_version_id");
CREATE INDEX "index_employees_on_data_version_id_and_person_id" ON "employees" ("data_version_id", "person_id");
CREATE INDEX "index_employees_on_data_version_id_and_manager_id" ON "employees" ("data_version_id", "manager_id");
CREATE INDEX "employees_manager_id_IDX" ON "employees" ("manager_id");
CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar COLLATE "NOCASE" NOT NULL, "parent_id" integer DEFAULT NULL, "full_path" varchar(2048) COLLATE "NOCASE" NOT NULL, "depth" integer DEFAULT 0, "children" integer DEFAULT 0 NOT NULL, "descendents" integer DEFAULT 0 NOT NULL, "member_count" integer DEFAULT 0 NOT NULL, "org_member_count" integer DEFAULT 0 NOT NULL, "manager_count" integer DEFAULT 0 NOT NULL, "team_health" varchar COLLATE "NOCASE" DEFAULT 'green' NOT NULL, "team_health_details" varchar COLLATE "NOCASE" DEFAULT '(green)' NOT NULL, "data_version_id" bigint DEFAULT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "pretty_name" varchar COLLATE "NOCASE" DEFAULT NULL, CONSTRAINT "fk_rails_49c7835325"
FOREIGN KEY ("data_version_id")
  REFERENCES "data_versions" ("id")
);
CREATE INDEX "index_teams_on_data_version_id" ON "teams" ("data_version_id");
CREATE INDEX "index_teams_on_data_version_id_and_parent_id" ON "teams" ("data_version_id", "parent_id");
CREATE UNIQUE INDEX "index_teams_on_name_and_parent_id_and_depth" ON "teams" ("name", "parent_id", "depth");
