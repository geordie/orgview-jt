require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  # Configure for CI environments
  if ENV['CI']
    # In CI, use a simple headless configuration
    driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400] do |driver_opts|
      driver_opts.add_argument("--no-sandbox")
      driver_opts.add_argument("--disable-dev-shm-usage")
      driver_opts.add_argument("--disable-gpu")
      driver_opts.add_argument("--headless")
    end
  else
    # Local development - use rack_test for faster, simpler testing
    # This avoids Chrome driver complexities for basic functionality tests
    driven_by :rack_test
  end
end
