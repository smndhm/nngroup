export const getCoursesSchedule = async (course: number) => {
    const response = await fetch(`api/courses/${course}/schedule`)
    return await response.json();
}

export const courseSave = async (course: number) => {
    const response = await fetch(`api/profile/saved/courses/${course}`, {
        method: 'POST',
    })
    return await response.json();
}

export const courseDelete = async (course: number) => {
    const response = await fetch(`api/profile/saved/courses/${course}`, {
        method: 'DELETE',
    })
    return await response.json();
}