package com.projects.RepoRoom.service;

import com.projects.RepoRoom.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class GitHubService {
    private final WebClient webClient;
    private final OAuth2TokenService oAuth2TokenService;

    public GitHubService(WebClient.Builder webClientBuilder,
                         @Value("${github.api.base-url}") String githubApiBaseUrl, OAuth2TokenService oAuth2TokenService) {
        this.oAuth2TokenService = oAuth2TokenService;
        this.webClient = webClientBuilder.baseUrl(githubApiBaseUrl).build();
    }

    public Mono<List<String>> getRepos(OAuth2AuthenticationToken authenticationToken) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/user/repos")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error(new RuntimeException("Client error: " + response.statusCode())))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(RepoNameDto.class)
                .map(RepoNameDto::getName)
                .collectList();
    }

    public Mono<List<GithubBranchDto>> getListOfBranchesOnARepo(OAuth2AuthenticationToken authenticationToken, String owner, String repo) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repo}/branches", owner, repo)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error(new RuntimeException("Not found: " + response.statusCode())))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(GithubBranchDto.class)
                .collectList();
    }

    public Mono<List<PullRequestsDto>> getListOfPullRequests(OAuth2AuthenticationToken authenticationToken, String owner, String repo) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repos}/pulls", owner, repo)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error((new RuntimeException("Not found: " + response.statusCode()))))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(PullRequestsDto.class)
                .collectList();
    }

    public Mono<List<CommitsDto>> getListOfCommitsOnPullRequest(OAuth2AuthenticationToken authenticationToken,
                                                                String owner,
                                                                String repoName,
                                                                String pullNumber) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repo}/pulls/{pull_number}/commits", owner, repoName, pullNumber)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error((new RuntimeException("Not found: " + response.statusCode()))))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(CommitsDto.class)
                .collectList();
    }

    public Mono<List<AffectedFilesDto>> getFilesAffectedInAPullRequest(OAuth2AuthenticationToken authenticationToken,
                                                                       String owner,
                                                                       String repoName,
                                                                       String pullNumber) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repo}/pulls/{pull_number}/files", owner, repoName, pullNumber)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error((new RuntimeException("Not found: " + response.statusCode()))))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(AffectedFilesDto.class)
                .collectList();
    }

    public Mono<List<CommentsDto>> getReviewCommentsOnPR(OAuth2AuthenticationToken authenticationToken,
                                              String owner,
                                              String repoName,
                                              String pullNumber) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repo}/pulls/{pull_number}/comments", owner, repoName, pullNumber)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error((new RuntimeException("Not found: " + response.statusCode()))))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(CommentsDto.class)
                .collectList();
    }

    public Mono<List<ReviewsDto>> getReviewsOnPR(OAuth2AuthenticationToken authenticationToken,
                                       String owner,
                                       String repoName,
                                       String pullNumber) {
        String accessToken = oAuth2TokenService.getAccessToken(authenticationToken);
        return webClient.get()
                .uri("/repos/{owner}/{repo}/pulls/{pull_number}/reviews", owner, repoName, pullNumber)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error((new RuntimeException(("Not found: " + response.statusCode())))))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server error: " + response.statusCode())))
                .bodyToFlux(ReviewsDto.class)
                .collectList();
    }
}
