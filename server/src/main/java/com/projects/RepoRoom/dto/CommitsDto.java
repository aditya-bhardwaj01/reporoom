package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommitsDto {
    @JsonAlias("url")
    private String apiUrl;

    @JsonAlias("html_url")
    private String commitUrl;

    @JsonAlias("comments_url")
    private String commentsUrl;

    private Commit commit;

    private Author author;

    private Committer committer;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    private static class Commit {
        @JsonAlias("url")
        private String apiUrl;
        private String message;
        @JsonAlias("comment_count")
        private String commentCount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    private static class Author {
        private String login;
        @JsonAlias("avatar_url")
        private String avatarUrl;
        @JsonAlias("html_url")
        private String profileUrl;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    private static class Committer {
        private String login;
        @JsonAlias("avatar_url")
        private String avatarUrl;
        @JsonAlias("html_url")
        private String profileUrl;
    }
}
