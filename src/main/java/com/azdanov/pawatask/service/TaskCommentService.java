package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Comment;
import com.azdanov.pawatask.domain.Task;
import com.azdanov.pawatask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskCommentService implements TaskCommentInterface {

    private TaskRepository taskRepository;

    @Autowired
    public TaskCommentService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public Task save(int taskId, Comment comment) {
        // Make sure id is not set by user
        comment.setId(0);

        Task task = taskRepository.getOne(taskId);

        if (task == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not added");
        }

        task.addComment(comment);
        taskRepository.saveAndFlush(task);

        return task;
    }
}
