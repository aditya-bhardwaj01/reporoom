package com.projects.RepoRoom.service;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;

@Service
public class OAuth2TokenService {

    private final OAuth2AuthorizedClientService clientService;

    public OAuth2TokenService(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

    public String getAccessToken(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        String clientRegistrationId = "github";
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(clientRegistrationId, oAuth2AuthenticationToken.getName());
        if(client != null) {
            OAuth2AccessToken accessToken = client.getAccessToken();
            if (accessToken != null) {
                return accessToken.getTokenValue();
            }
        }
        throw new RuntimeException();
    }
}
