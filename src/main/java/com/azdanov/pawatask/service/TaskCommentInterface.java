package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Comment;
import com.azdanov.pawatask.domain.Task;

public interface TaskCommentInterface {
    Task save(int taskId, Comment comment);
}
