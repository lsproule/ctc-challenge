ENV["RAILS_ENV"] ||= "test"

require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)
    include Devise::Test::IntegrationHelpers


    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

        # Helper to simulate login as a user
    def sign_in_as(user)
      sign_in(user)
    end

    # Bypass Devise authentication in a test by stubbing current_user
    def bypass_authentication
      ApplicationController.any_instance.stub(:current_user).and_return(nil)  # or mock a user if needed
    end
    # Add more helper methods to be used by all tests here...
  end
end
