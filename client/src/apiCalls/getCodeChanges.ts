type CommitStats = {
  total: number;
  additions: number;
  deletions: number;
};

type CommitFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
};

export type CommitData = {
  stats: CommitStats;
  files: CommitFile[];
};

export const getCodeChanges = async (url: string): Promise<CommitData> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch commit: ${response.statusText}`);
  }

  const commitData = await response.json();

  // Filter and transform the data according to our types
  const filteredData: CommitData = {
    stats: {
      total: commitData.stats?.total || 0,
      additions: commitData.stats?.additions || 0,
      deletions: commitData.stats?.deletions || 0,
    },
    files: (commitData.files || []).map((file: any) => ({
      filename: file.filename || "",
      status: file.status || "",
      additions: file.additions || 0,
      deletions: file.deletions || 0,
      changes: file.changes || 0,
      patch: file.patch,
    })),
  };

  return filteredData;
};
