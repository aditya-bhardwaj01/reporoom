import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch, GitHubPullRequest, User } from "./type";
import { Group } from "../apiCalls/types";

interface stateType {
  user: User | null;
  loading: boolean;
  isDarkMode: boolean;
  isCreateGroupModalOpen: boolean;
  isGroupDetailsModalOpen?: boolean;
  myRepos: string[];
  areReposFetched: boolean;
  selectedRepo: string | null;
  groupsList: Group[];
  branches: Branch[];
  selectedBranch: string | null;
  pullRequests: GitHubPullRequest[];
}

const initialState: stateType = {
  user: null,
  loading: true,
  isDarkMode: true,
  isCreateGroupModalOpen: false,
  isGroupDetailsModalOpen: false,
  myRepos: [],
  areReposFetched: false,
  selectedRepo: null,
  groupsList: [],
  branches: [],
  selectedBranch: null,
  pullRequests: [],
};

const applicationSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setIsCreateGroupModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateGroupModalOpen = action.payload;
    },
    setIsGroupDetailsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isGroupDetailsModalOpen = action.payload;
    },
    setMyRepos: (state, action: PayloadAction<string[]>) => {
      state.myRepos = action.payload;
    },
    setAreReposFetched: (state, action: PayloadAction<boolean>) => {
      state.areReposFetched = action.payload;
    },
    setSelectedRepo: (state, action: PayloadAction<string | null>) => {
      state.selectedRepo = action.payload;
    },
    setGroupsList: (state, action: PayloadAction<Group[]>) => {
      state.groupsList = action.payload;
    },
    setBranches: (state, action: PayloadAction<Branch[]>) => {
      state.branches = action.payload;
    },
    setSelectedBranch: (state, action: PayloadAction<string | null>) => {
      state.selectedBranch = action.payload;
    },
    setPullRequests: (state, action: PayloadAction<GitHubPullRequest[]>) => {
      state.pullRequests = action.payload;
    },
  },
});

export const { 
  setUser, 
  setLoading, 
  setIsDarkMode, 
  setIsCreateGroupModalOpen,
  setIsGroupDetailsModalOpen,
  setMyRepos,
  setAreReposFetched,
  setSelectedRepo,
  setGroupsList,
  setBranches,
  setSelectedBranch,
  setPullRequests,
} = applicationSlice.actions;
export default applicationSlice.reducer;
