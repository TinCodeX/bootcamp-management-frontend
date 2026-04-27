export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    REQUEST_RESET: '/auth/password-reset-request',
    RESET_PASSWORD: '/auth/password-reset-confirm',
  },
  USERS: {
    BASE: '/admin/users',
    DETAIL: (id: string) => `/admin/users/${id}`,
    STATUS: (id: string) => `/admin/users/${id}/status`,
  },
  SESSIONS: {
    BASE: '/bootcamps/sessions',
    DETAIL: (id: string) => `/bootcamps/sessions/${id}`,
  },
  DIVISIONS: {
    BASE: '/divisions',
    DETAIL: (id: string) => `/divisions/${id}`,
    BOOTCAMPS: (id: string) => `/divisions/${id}/bootcamps`,
  },
  BOOTCAMPS: {
    BASE: '/admin/bootcamps',
    DETAIL: (id: string) => `/admin/bootcamps/${id}`,
    RESOURCES: (bootcampId: string) => `/bootcamps/${bootcampId}/resources`,
    RESOURCE_DETAIL: (bootcampId: string, resourceId: string) => `/bootcamps/${bootcampId}/resources/${resourceId}`,
    RESOURCE_DOWNLOAD: (bootcampId: string, resourceId: string) => `/bootcamps/${bootcampId}/resources/${resourceId}/download`,
    ATTENDANCE: (bootcampId: string) => `/student/bootcamps/${bootcampId}/attendance`,
    ATTENDANCE_STATS: (bootcampId: string) => `/student/bootcamps/${bootcampId}/attendance/stat`,
  },
  STUDENT: {
    FEEDBACK_PENDING: '/student/sessions/feedback-pending',
    FEEDBACK_SUBMIT: (sessionId: string) => `/student/sessions/${sessionId}/feedback`,
    FEEDBACK_MY: (sessionId: string) => `/student/sessions/${sessionId}/feedback/my`,
    SUBMISSIONS: '/student/submissions',
    SUBMISSION_DETAIL: (submissionId: string) => `/student/submissions/${submissionId}`,
    TASKS: '/student/tasks',
    TASK_DETAIL: (taskId: string) => `/student/tasks/${taskId}`,
    TASK_SUBMIT: (taskId: string) => `/student/tasks/${taskId}/submit`,
  },
} as const;
