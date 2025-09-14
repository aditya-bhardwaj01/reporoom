package com.projects.RepoRoom.dto;

import lombok.*;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupDetailsDto {
    private ObjectId id;
    private String groupName;
    private String repoName;
    private String owner;
    private String secretCode;
    private List<MemberDetailsDto> members;
}
