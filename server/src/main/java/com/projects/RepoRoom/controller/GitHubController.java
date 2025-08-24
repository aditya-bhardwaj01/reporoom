package com.projects.RepoRoom.controller;

import com.projects.RepoRoom.service.GitHubService;
import com.projects.RepoRoom.service.OAuth2TokenService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService gitHubService;

    public GitHubController(GitHubService gitHubService, OAuth2AuthorizedClientService oAuth2AuthorizedClientService, OAuth2TokenService oAuth2TokenService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/repo")
    public Mono<List<String>> getRepositoryInfo(OAuth2AuthenticationToken authenticationToken) {
        return gitHubService.getRepos(authenticationToken);
    }
}
