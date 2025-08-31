package com.projects.RepoRoom.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.projects.RepoRoom.common.serializer.ObjectIdSerializer;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Builder
public class User {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @NonNull
    @Indexed(unique = true)
    private String username;

    @NonNull
    private String name;

//    @Indexed(unique = true)
    private String email;

    private String avatar_url;

    private String profile_url;

    @NonNull
    private Integer followers;

    @NonNull
    private Integer following;

    @NonNull
    private Integer public_repos;
}
