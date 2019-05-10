package com.azdanov.pawatask.controller;

import com.azdanov.pawatask.domain.Comment;
import com.azdanov.pawatask.domain.Task;
import com.azdanov.pawatask.service.TaskCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskCommentController {

    @Autowired private TaskCommentService taskCommentService;

    @PostMapping("/{taskId}/comments")
    public Task addComment(@PathVariable int taskId, @RequestBody Comment comment) {
        return taskCommentService.save(taskId, comment);
    }
}
