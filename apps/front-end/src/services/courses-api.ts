/**
 * Fetches course schedule information from the API
 * @param course - Course ID
 * @returns Promise resolving to course schedule data
 */
export const getCoursesSchedule = async (course: number) => {
  const response = await fetch(`api/courses/${course}/schedule`);
  return await response.json();
};

/**
 * Saves a course to the user's profile
 * @param course - Course ID to save
 * @returns Promise resolving to updated saved courses data
 */
export const courseSave = async (course: number) => {
  const response = await fetch(`api/profile/saved/courses/${course}`, {
    method: "POST",
  });
  return await response.json();
};

/**
 * Removes a saved course from the user's profile
 * @param course - Course ID to remove
 * @returns Promise resolving to updated saved courses data
 */
export const courseDelete = async (course: number) => {
  const response = await fetch(`api/profile/saved/courses/${course}`, {
    method: "DELETE",
  });
  return await response.json();
};
