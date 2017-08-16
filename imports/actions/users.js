export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const updateUserProfile = userProfile => {
  return {
    type: UPDATE_USER_PROFILE,
		userProfile,
  };
}
