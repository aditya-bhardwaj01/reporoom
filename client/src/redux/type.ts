export interface User {
  username?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  profile_url?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
}

export type Branch = { name: string };

export interface GitHubPullRequest {
  url: string;
  title: string;
  state: string;
  labels: Label[];
  body: string;
  created_at: string;
  merged_at: string | null;
  assignees: Assignee[];
  requested_reviewers: RequestedReviewer[];
  head: BranchInfo;
  base: BranchInfo;
}

export interface Label {
  name: string;
}

export interface Assignee {
  login: string;
  url: string;
}

export interface RequestedReviewer {
  login: string;
  url: string;
}

export interface BranchInfo {
  ref: string;
}