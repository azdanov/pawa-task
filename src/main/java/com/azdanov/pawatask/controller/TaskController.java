package com.azdanov.pawatask.controller;

import com.azdanov.pawatask.domain.Task;
import com.azdanov.pawatask.service.TaskService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("")
    public List<Task> findAll() {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable int id) {
        return taskService.findById(id);
    }

    @PostMapping("")
    public Task addTask(@RequestBody Task task) {
        taskService.save(task);

        return task;
    }

    @PutMapping("")
    public Task updateTask(@RequestBody Task task) {
        taskService.update(task);

        return task;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTask(@PathVariable int id) {

        taskService.deleteById(id);

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
