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
    BASE: (bootcampId: string) => `/bootcamps/${bootcampId}/sessions`,
    DETAIL: (bootcampId: string, sessionId: string) => `/bootcamps/${bootcampId}/sessions/${sessionId}`,
    CREATE: (bootcampId: string) => `/bootcamps/${bootcampId}/sessions`,
    UPDATE: (bootcampId: string, sessionId: string) => `/bootcamps/${bootcampId}/sessions/${sessionId}`,
    DELETE: (bootcampId: string, sessionId: string) => `/bootcamps/${bootcampId}/sessions/${sessionId}`,
    CANCEL: (bootcampId: string, sessionId: string) => `/bootcamps/${bootcampId}/sessions/${sessionId}/cancel`,
  },
  DIVISIONS: {
    BASE: '/admin/divisions',
    DETAIL: (id: string) => `/admin/divisions/${id}`,
    STATISTICS: (id: string) => `/admin/divisions/${id}/statistics`,
    BOOTCAMPS: (id: string) => `/admin/divisions/${id}/bootcamps`,
  },
  BOOTCAMPS: {
    BASE: '/admin/bootcamps',
    DETAIL: (id: string) => `/admin/bootcamps/${id}`,
    DEACTIVATE: (id: string) => `/admin/bootcamps/${id}/deactivate`,
    ASSIGN_LEAD: (id: string) => `/admin/bootcamps/${id}/assign-lead`,
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
    BOOTCAMPS: '/bootcamps',
  },
  SETTINGS: {
    BASE: '/admin/settings',
  },
  RESOURCES: {
    BASE: (bootcampId: string) => `/bootcamps/${bootcampId}/resources`,
    DETAIL: (bootcampId: string, resourceId: string) => `/bootcamps/${bootcampId}/resources/${resourceId}`,
    DOWNLOAD: (bootcampId: string, resourceId: string) => `/bootcamps/${bootcampId}/resources/${resourceId}/download`,
    
  }
} as const;
