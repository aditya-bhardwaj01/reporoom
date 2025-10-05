import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch, GitHubPullRequest, Group, GroupWithMemberDetails, ModalType, User } from "./type";

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
  groupDetail: GroupWithMemberDetails | null;
  modalType: ModalType;
}

const initialState: stateType = {
  user: null,
  loading: true,
  isDarkMode: false,
  isCreateGroupModalOpen: false,
  isGroupDetailsModalOpen: false,
  myRepos: [],
  areReposFetched: false,
  selectedRepo: null,
  groupsList: [],
  branches: [],
  selectedBranch: null,
  pullRequests: [],
  groupDetail: null,
  modalType: ModalType.NONE,
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
    setGroupDetails: (state, action: PayloadAction<GroupWithMemberDetails | null>) => {
      state.groupDetail = action.payload;
    },
    setModalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    }
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
  setGroupDetails,
  setModalType,
} = applicationSlice.actions;
export default applicationSlice.reducer;
