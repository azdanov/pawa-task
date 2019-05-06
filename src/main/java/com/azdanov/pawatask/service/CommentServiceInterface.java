package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Comment;

public interface CommentServiceInterface {

    void update(Comment comment);

    void deleteById(int id);
}
