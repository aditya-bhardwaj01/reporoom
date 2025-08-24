package com.projects.RepoRoom.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.projects.RepoRoom.common.serializer.ObjectIdSerializer;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "groups")
@Data
@Builder
public class Groups {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @NonNull
    private String groupName;

    @NonNull
    private String repoName;

    @NonNull
    private String owner;

    @NonNull String secretCode;

    @NonNull
    private List<ObjectId> membersIds;
}
