package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PullRequestsDto {
    @JsonAlias("number")
    private String pullNumber;
    @JsonAlias("html_url")
    private String url;
    private String title;
    private String state;
    private List<Label> labels;
    private String body;

    @JsonAlias("created_at")
    private ZonedDateTime createdAt;

    @JsonAlias("merged_at")
    private ZonedDateTime mergedAt;

    @JsonAlias("user")
    private Author author;

    private List<Assignee> assignees;

    @JsonAlias("requested_reviewers")
    private List<RequestedReviewer> requestedReviewers;

    // Branch information
    private Head head;
    private Base base;

    // Nested DTO classes
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Label {
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Author {
        @JsonAlias("html_url")
        private String profileUrl;
        private String login;
        private String avatar_url;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Assignee {
        @JsonAlias("html_url")
        private String profileUrl;
        private String login;
        private String avatar_url;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RequestedReviewer {
        @JsonAlias("html_url")
        private String profileUrl;
        private String login;
        private String avatar_url;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Head {
        private String ref;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Base {
        private String ref;
    }

}
