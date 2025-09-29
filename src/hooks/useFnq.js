import { useState, useEffect, useCallback } from 'react';
import { getFnqs, getFnqById, createFnq, updateFnq, deleteFnq, getFnqStatuses } from '@/utils/api/fnq-api';

export function useFnqs(searchKeyword = '', userId = null) {
  const [fnqs, setFnqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFnqs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFnqs(searchKeyword, userId);
      setFnqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, userId]);

  useEffect(() => {
    fetchFnqs();
  }, [fetchFnqs]);

  const refetch = useCallback(() => {
    fetchFnqs();
  }, [fetchFnqs]);

  return {
    fnqs,
    loading,
    error,
    refetch
  };
}

export function useFnq(fnqId) {
  const [fnq, setFnq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFnq = useCallback(async () => {
    if (!fnqId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getFnqById(fnqId);
      setFnq(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fnqId]);

  useEffect(() => {
    fetchFnq();
  }, [fetchFnq]);

  const refetch = useCallback(() => {
    fetchFnq();
  }, [fetchFnq]);

  return {
    fnq,
    loading,
    error,
    refetch
  };
}

export function useFnqActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFnqAction = useCallback(async (fnqData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await createFnq(fnqData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFnqAction = useCallback(async (fnqId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateFnq(fnqId, updateData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFnqAction = useCallback(async (fnqId) => {
    setLoading(true);
    setError(null);

    try {
      const success = await deleteFnq(fnqId);
      return success;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createFnq: createFnqAction,
    updateFnq: updateFnqAction,
    deleteFnq: deleteFnqAction,
    loading,
    error
  };
}

export function useFnqStatuses() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatuses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFnqStatuses();
      setStatuses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const refetch = useCallback(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  return {
    statuses,
    loading,
    error,
    refetch
  };
}
