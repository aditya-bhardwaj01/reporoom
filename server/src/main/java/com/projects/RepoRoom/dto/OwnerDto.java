package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerDto {

    private String login;

    private Long id;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    private String url;

    @JsonProperty("repos_url")
    private String reposUrl;

    private String type;
}