package com.projects.RepoRoom.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
public class ValidateLogin {

    @GetMapping("/validateLogin")
    public ResponseEntity<Map<String, Object>> me(OAuth2AuthenticationToken authenticationToken) {
        OAuth2User principal = authenticationToken.getPrincipal();

        Map<String, Object> userInfo = Map.of(
                "username", Optional.ofNullable(principal.getAttribute("login")).orElse("N/A"),
                "name", Optional.ofNullable(principal.getAttribute("name")).orElse("N/A"),
                "avatar_url", Optional.ofNullable(principal.getAttribute("avatar_url")).orElse("N/A"),
                "profile_url", Optional.ofNullable(principal.getAttribute("html_url")).orElse("N/A"),
                "followers", Optional.ofNullable(principal.getAttribute("followers")).orElse(0),
                "following", Optional.ofNullable(principal.getAttribute("following")).orElse(0),
                "public_repos", Optional.ofNullable(principal.getAttribute("public_repos")).orElse(0),
                "email", Optional.ofNullable(principal.getAttribute("email")).orElse("Not provided")
        );

        return ResponseEntity.ok(userInfo); // HTTP 200 OK
    }
}
