package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.projects.RepoRoom.common.serializer.ObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDetailsDto {
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId memberId;
    private String memberName;
    private String avatar_url;
    private String profile_url;
    private Integer followers;
    private Integer following;
}
