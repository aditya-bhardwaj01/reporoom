package com.projects.RepoRoom.controller;

import com.projects.RepoRoom.dto.CreateGroupDto;
import com.projects.RepoRoom.dto.GroupDetailsDto;
import com.projects.RepoRoom.entity.Groups;
import com.projects.RepoRoom.service.GroupsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupsController {

    @Autowired
    private GroupsService groupsService;

    @PostMapping("/create-group")
    public ResponseEntity<Groups> createGroup(OAuth2AuthenticationToken authenticationToken, @RequestBody CreateGroupDto newGroup) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        Groups createdGroup = groupsService.createGroup(
                newGroup.getGroupName(),
                newGroup.getRepoName(),
                username
        );

        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }


    @GetMapping("/associated-groups")
    public ResponseEntity<List<Groups>> getAssociatedGroups(OAuth2AuthenticationToken authenticationToken) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");

        List<Groups> associatedGroups = groupsService.getAssociatedGroups(username);
        return ResponseEntity.ok(associatedGroups); // Shortcut for 200 OK
    }

    @PostMapping("/join-group")
    public ResponseEntity<?> joinGroup(OAuth2AuthenticationToken authenticationToken, @RequestBody Map<String,String> body) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        String code = body.get("secretCode");
        try {
            Groups group = groupsService.joinGroup(code, username);
            return ResponseEntity.ok(group);
        } catch (RuntimeException error) {
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("single-group/{groupId}")
    public ResponseEntity<?> getSingleGroup(OAuth2AuthenticationToken authenticationToken, @PathVariable String groupId) {
        OAuth2User principal = authenticationToken.getPrincipal();
        String username = principal.getAttribute("login");
        try {
            GroupDetailsDto groups = groupsService.getSingleGroup(username, groupId);
            return ResponseEntity.ok(groups);
        } catch (RuntimeException error) {
            return ResponseEntity.badRequest().body(error);
        }
    }
}
