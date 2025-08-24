package com.projects.RepoRoom.service;

import com.projects.RepoRoom.dto.RepoNameDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

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
                .bodyToFlux(RepoNameDto.class)
                .map(RepoNameDto::getName)
                .collectList();
    }
}
