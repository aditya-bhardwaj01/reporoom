package com.projects.RepoRoom.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AffectedFilesDto {
    private String filename;
    private String status;
    private Integer additions;
    private Integer deletions;
    private Integer changes;

    @JsonAlias("blob_url")
    private String blobUrl;

    @JsonAlias("raw_url")
    private String rawUrl;

    @JsonAlias("contents_url")
    private String contentsUrl;
}
