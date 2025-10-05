package com.projects.RepoRoom.controller;

import com.projects.RepoRoom.dto.*;
import com.projects.RepoRoom.service.GitHubService;
import com.projects.RepoRoom.service.GroupsService;
import com.projects.RepoRoom.service.OAuth2TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService gitHubService;
    private final GroupsService groupsService;

    public GitHubController(GitHubService gitHubService, GroupsService groupsService, OAuth2AuthorizedClientService oAuth2AuthorizedClientService, OAuth2TokenService oAuth2TokenService) {
        this.gitHubService = gitHubService;
        this.groupsService = groupsService;
    }

    @GetMapping("/repo")
    public Mono<List<String>> getRepositoryInfo(OAuth2AuthenticationToken authenticationToken) {
        return gitHubService.getRepos(authenticationToken);
    }

    @GetMapping("/repo-branches/{groupId}")
    public Mono<List<GithubBranchDto>> getBranchesOnARepository(OAuth2AuthenticationToken authenticationToken,
                                                                @PathVariable String groupId) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getListOfBranchesOnARepo(authenticationToken, owner, repoName);
        } catch (RuntimeException exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;

            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }

    @GetMapping("/pull-requests/{groupId}")
    public Mono<List<PullRequestsDto>> getPullRequestData(OAuth2AuthenticationToken authenticationToken,
                                                          @PathVariable String groupId) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getListOfPullRequests(authenticationToken, owner, repoName);
        } catch (RuntimeException exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;

            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }

    @GetMapping("/commits/{groupId}/{pullNumber}")
    public Mono<List<CommitsDto>> getCommitsOnAPullRequest(OAuth2AuthenticationToken authenticationToken, @PathVariable String groupId, @PathVariable String pullNumber) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getListOfCommitsOnPullRequest(authenticationToken, owner, repoName, pullNumber);
        } catch (RuntimeException exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;

            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }

    @GetMapping("/files/{groupId}/{pullNumber}")
    public Mono<List<AffectedFilesDto>> getFilesAffectedInAPR(OAuth2AuthenticationToken authenticationToken,
                                                              @PathVariable String groupId,
                                                              @PathVariable String pullNumber) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getFilesAffectedInAPullRequest(authenticationToken, owner, repoName, pullNumber);
        } catch (RuntimeException exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;
            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }

    @GetMapping("comments/{groupId}/{pullNumber}")
    public Mono<List<CommentsDto>> getReviewCommentsOnPR(OAuth2AuthenticationToken authenticationToken,
                                              @PathVariable String groupId,
                                              @PathVariable String pullNumber) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getReviewCommentsOnPR(authenticationToken, owner, repoName, pullNumber);
        } catch (RuntimeException exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;
            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }

    @GetMapping("reviews/{groupId}/{pullNumber}")
    public Mono<List<ReviewsDto>> getReviewsOnAPR(OAuth2AuthenticationToken authenticationToken,
                                        @PathVariable String groupId,
                                        @PathVariable String pullNumber) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto group = groupsService.getSingleGroup(username, groupId);
            String owner = group.getOwner();
            String repoName = group.getRepoName();
            return gitHubService.getReviewsOnPR(authenticationToken, owner, repoName, pullNumber);
        } catch (Exception exception) {
            HttpStatus status = exception.getMessage() != null && exception.getMessage().contains("Unauthorised request")
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;
            throw new ResponseStatusException(status, "Unauthorized access or invalid request");
        }
    }
}
