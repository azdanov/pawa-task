package com.azdanov.pawatask.repository;

import com.azdanov.pawatask.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {}
