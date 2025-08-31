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