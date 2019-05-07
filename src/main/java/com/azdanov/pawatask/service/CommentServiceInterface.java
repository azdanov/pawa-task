package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Comment;

public interface CommentServiceInterface {

    Comment update(Comment comment);

    void deleteById(int id);
}
