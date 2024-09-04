import { TablePaginationConfig } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export type IPage = {
  limit: number;
  page: number;
  [propName: string]: any;
};

interface QueryParams {
  endFetchApi?: boolean;
}

/**
 *
 * @param {Function} api 接口
 * @param {Object} query endFetchApi:true
 * @returns
 */
function useTable<T, K>(api: (params: T) => Promise<K>, query?: QueryParams & T) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<K>();

  const { page = 1, limit = 10, count = 0 } = data || ({} as any);

  const pagination: TablePaginationConfig = {
    current: page,
    pageSize: limit,
    total: count,
    showTotal: () => `共有${count}项`,
    position: ['bottomRight'],
    showQuickJumper: true,
  };

  const apiFetch: (query?: T) => void = useCallback(
    async (query) => {
      try {
        setLoading(true);
        const params = { ...page, limit, ...query };

        const res = await api(params as T);

        setData(res);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [data]
  );

  useEffect(() => {
    if (!query?.endFetchApi) {
      apiFetch(query);
    }
  }, []);

  return { loading, data, apiFetch, pagination };
}

export default useTable;
