package com.society.server.repository;
import com.society.server.model.entity.PostEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    @EntityGraph(attributePaths = "comments")
    Optional<PostEntity> findPostEntityById(Long id);
    @EntityGraph(attributePaths = "comments")
    List<PostEntity> findAllByAuthorUsername(String username);
    List<PostEntity> findTop50ByOrderByCreatedOnDesc();
}