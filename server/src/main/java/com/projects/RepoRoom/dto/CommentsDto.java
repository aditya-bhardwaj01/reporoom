package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentsDto {
    private String path;
    private Integer position;

    @JsonAlias("diff_hunk")
    private String diffHunk;

    @JsonAlias("original_position")
    private Integer originalPosition;

    private User user;

    private String body;

    @JsonAlias("created_at")
    private ZonedDateTime createdAt;

    @JsonAlias("updated_at")
    private ZonedDateTime updatedAt;

    @JsonAlias("html_url")
    private String url;

    @JsonAlias("start_line")
    private Integer startLine;

    @JsonAlias("original_start_line")
    private Integer originalStartLine;

    @JsonAlias("start_side")
    private String startSide;

    private Integer line;

    @JsonAlias("original_line")
    private Integer originalLine;

    private String side;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class User {
        @JsonAlias("login")
        public String username;

        @JsonAlias("html_url")
        private String profile_url;

        @JsonAlias("avatar_url")
        private String avatar_url;
    }
}
