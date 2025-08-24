package com.projects.RepoRoom.repository;

import com.projects.RepoRoom.entity.Groups;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroupsRepository extends MongoRepository<Groups, ObjectId> {
    List<Groups> findByMembersIdsContaining(ObjectId memberId);
    boolean existsBySecretCode(String secretCode);
}
