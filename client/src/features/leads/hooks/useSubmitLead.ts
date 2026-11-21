import { useState, useCallback } from 'react';
import { leadApi } from '../api/leadApi';
import type { SubmitLeadInput } from '../types/lead.types';

interface UseSubmitLeadState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  submittedName: string | null;
}

export function useSubmitLead() {
  const [state, setState] = useState<UseSubmitLeadState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    submittedName: null
  });

  const submit = useCallback(async (data: SubmitLeadInput): Promise<boolean> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      errorMessage: null
    }));

    try {
      const result = await leadApi.submitLead(data);
      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: null,
        submittedName: result.data.fullName || data.fullName
      });
      return true;
    } catch (err: any) {
      const msg = err.message || 'Unable to submit your enquiry. Please check your connection or contact us directly.';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: msg
      }));
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: null,
      submittedName: null
    });
  }, []);

  return {
    submit,
    reset,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    errorMessage: state.errorMessage,
    submittedName: state.submittedName
  };
}
