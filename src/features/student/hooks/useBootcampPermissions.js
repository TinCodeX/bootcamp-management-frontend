import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

export function useBootcampPermissions(bootcampId) {
  const [isLeadInstructor, setIsLeadInstructor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bootcampId) return;
    setLoading(true);
    setError('');
    axiosInstance
      .get(`/bootcamps/${bootcampId}/permissions`)
      .then((res) => {
        setIsLeadInstructor(!!res.data?.isLeadInstructor);
      })
      .catch((err) => {
        // If 403 Forbidden, treat as not instructor, not an error
        if (err?.response?.status === 403) {
          setIsLeadInstructor(false);
          setError('');
        } else {
          setError(err?.response?.data?.message || err?.message || 'Failed to fetch permissions.');
        }
      })
      .finally(() => setLoading(false));
  }, [bootcampId]);

  return { isLeadInstructor, loading, error };
}
