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

export interface AssociatedGroupsType {
  id: string;
  groupName: string;
  repoName: string;
  owner: string;
  secretCode: string;
  memberIds: string[];
}

export interface Group {
  id: string;
  groupName: string;
  repoName: string;
  owner: string;
  secretCode: string;
  memberIds: string[];
}

export interface GroupWithMemberDetails extends Omit<Group, "memberIds"> {
  members: {
    memberId: string;
    memberName: string;
    avatar_url: string;
    profile_url: string;
    followers: number;
    following: number;
  }[];
}

export type Branch = { name: string };

export interface GitHubPullRequest {
  pullNumber: number;
  url: string;
  title: string;
  state: string;
  labels: Label[];
  body: string;
  createdAt: string;
  mergedAt: string | null;
  author: Author;
  assignees: Assignee[];
  requestedReviewers: RequestedReviewer[];
  head: BranchInfo;
  base: BranchInfo;
}

export interface Label {
  name: string;
}

export interface Author {
  login: string;
  profileUrl: string;
  avatar_url: string;
}

export interface Assignee {
  login: string;
  profileUrl: string;
  avatar_url: string;
}

export interface RequestedReviewer {
  login: string;
  profileUrl: string;
  avatar_url: string;
}

export interface BranchInfo {
  ref: string;
}

export enum ModalType {
  NONE = "none",
  MEMBERS = "members",
  ACTIONS = "actions",
}

export interface CommitsType {
  apiUrl: string;
  commitUrl: string;
  commentsUrl: string;
  commit: { apiUrl: string; message: string; commentCount: string };
  author: { login: string; avatarUrl: string; profileUrl: string };
  committer: { login: string; avatarUrl: string; profileUrl: string };
}

export interface FilesType {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blobUrl: string;
  rawUrl: string;
  contentsUrl: string;
}


export interface CommentType {
  path: string;
  position: number | null;
  originalPosition: number | null;
  user: User;
  body: string;
  createdAt: string;
  updatedAt: string;
  htmlUrl: string;
  startLine: number | null;
  originalStartLine: number | null;
  startSide: string;
  line: number | null;
  originalLine: number | null;
  side: string;
}

export interface ReviewType {
  user: User;
  body: string;
  state: string;
  url: string;
  submittedAt: string;
}