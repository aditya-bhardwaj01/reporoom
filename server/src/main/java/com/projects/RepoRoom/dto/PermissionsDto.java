package com.projects.RepoRoom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionsDto {
    private boolean admin;
    private boolean push;
    private boolean pull;
}