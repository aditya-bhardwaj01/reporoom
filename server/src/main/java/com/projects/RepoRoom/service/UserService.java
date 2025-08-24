package com.projects.RepoRoom.service;

import com.projects.RepoRoom.entity.User;
import com.projects.RepoRoom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createOrUpdateUserFromGitHub(OAuth2User oauthUser) {
        String username = oauthUser.getAttribute("login");
        String email = oauthUser.getAttribute("email");

        User existingUser = userRepository.findByUsername(username);

        if (existingUser != null) {
            existingUser.setName(oauthUser.getAttribute("name"));
            existingUser.setEmail(email);
            existingUser.setAvatar_url(oauthUser.getAttribute("avatar_url"));
            existingUser.setProfile_url(oauthUser.getAttribute("html_url"));
            return userRepository.save(existingUser);
        } else {
            User newUser = User.builder()
                    .username(username)
                    .name(oauthUser.getAttribute("name"))
                    .email(email)
                    .avatar_url(oauthUser.getAttribute("avatar_url"))
                    .profile_url(oauthUser.getAttribute("html_url"))
                    .followers(oauthUser.getAttribute("followers") != null ?
                            oauthUser.getAttribute("followers") : 0)
                    .following(oauthUser.getAttribute("following") != null ?
                            oauthUser.getAttribute("following") : 0)
                    .public_repos(oauthUser.getAttribute("public_repos") != null ?
                            oauthUser.getAttribute("public_repos") : 0)
                    .build();

            return userRepository.save(newUser);
        }
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
