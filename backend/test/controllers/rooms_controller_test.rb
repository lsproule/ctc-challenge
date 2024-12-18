require "test_helper"

class RoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)  # Assuming you have a fixture for users
    sign_in @user        # Sign in the user before each test


    @room = rooms(:one)
  end

  test "should get index" do
    get rooms_url, as: :json
    assert_response :success
  end

  test "should show room" do
    get room_url(@room), as: :json
    assert_response :success
  end

  test "should update room" do
    patch room_url(@room), params: { room: { is_private: @room.is_private, name: @room.name } }, as: :json
    assert_response :success
  end

end
