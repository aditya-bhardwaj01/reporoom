package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String url;
    private String title;
    private String state;
    private List<Label> labels;
    private String body;

    @JsonProperty("created_at")
    private ZonedDateTime createdAt;

    @JsonProperty("merged_at")
    private ZonedDateTime mergedAt;

    private List<Assignee> assignees;

    @JsonProperty("requested_reviewers")
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
    public static class Assignee {
        private String url;
        private String login;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RequestedReviewer {
        private String url;
        private String login;
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
