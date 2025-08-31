package com.projects.RepoRoom.service;

import com.projects.RepoRoom.entity.Groups;
import com.projects.RepoRoom.entity.User;
import com.projects.RepoRoom.repository.GroupsRepository;
import com.projects.RepoRoom.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
public class GroupsService {

    final int secretCodeLength = 6;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupsRepository groupsRepository;

    private ObjectId getUserId(String username) {
        User user = userRepository.findByUsername(username);
        return user.getId();
    }

    private String generateRandomCode() {
        String characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        SecureRandom random = new SecureRandom();
        while (true) {
            StringBuilder code = new StringBuilder(secretCodeLength);

            for (int i = 0; i < secretCodeLength; i++) {
                code.append(characters.charAt(random.nextInt(characters.length())));
            }
            String generatedCode = code.toString();

            if (!groupsRepository.existsBySecretCode(generatedCode)) {
                return generatedCode;
            }
        }
    }

    private String validateGroupName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Group name cannot be empty");
        }
        if (name.length() > 50) {
            throw new IllegalArgumentException("Group name too long (max 50 chars)");
        }
        return name.trim();
    }

    public Groups createGroup(String groupName, String repoName, String username) {
        String secretCode = generateRandomCode();
        ObjectId creatorId = getUserId(username);
        Groups newGroup = Groups.builder()
                .groupName(validateGroupName(groupName))
                .repoName(repoName)
                .owner(username)
                .secretCode(secretCode)
                .membersIds(List.of(creatorId))
                .build();
        return groupsRepository.save(newGroup);
    }

    public List<Groups> getAssociatedGroups(String username) {
        ObjectId memberId = userRepository.findByUsername(username).getId();
        return groupsRepository.findByMembersIdsContaining(memberId);
    }

    public Groups joinGroup(String secretCode, String username) {
        ObjectId userId = userRepository.findByUsername(username).getId();
        Groups groups = groupsRepository.findBySecretCode(secretCode)
                .orElseThrow(() -> new RuntimeException("Group not found with this secret code"));
        boolean alreadyJoined = groups.getMembersIds().contains(userId);
        if (alreadyJoined) {
            throw new RuntimeException("User alredy exist in the group");
        }
        groups.getMembersIds().add(userId);
        return groupsRepository.save(groups);
    }
}
