package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewsDto {
    private User user;
    private String body;
    private String state;

    @JsonAlias("html_url")
    private String url;

    @JsonAlias("submitted_at")
    private ZonedDateTime submittedAt;

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
