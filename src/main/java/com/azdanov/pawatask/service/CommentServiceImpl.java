package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Comment;
import com.azdanov.pawatask.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    @Transactional
    public Comment update(Comment comment) {
        if (!commentRepository.existsById(comment.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not updated");
        }

        return commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        commentRepository.deleteById(id);
    }
}
