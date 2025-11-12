import { useState } from 'react';
import { toast } from 'sonner';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<T = any, P = any>(
  apiCall: (params: P) => Promise<T>,
  options?: UseApiOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (params: P) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall(params);
      setData(response);

      if (options?.successMessage) {
        toast.success(options.successMessage);
      }

      if (options?.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (err: any) {
      setError(err);

      const errorMsg = options?.errorMessage || err.message || 'An error occurred';
      toast.error(errorMsg);

      if (options?.onError) {
        options.onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
