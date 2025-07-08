module CbaUtils
  def get_seniority_from_management_level(mgmt_level)
    if mgmt_level.nil? ||
        mgmt_level.strip.empty? ||
        mgmt_level.length < 7
      return 0
    end
    return mgmt_level[6].to_i
  end
end
