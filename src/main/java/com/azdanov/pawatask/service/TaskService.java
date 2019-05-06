package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Task;
import com.azdanov.pawatask.repository.TaskRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskService implements TaskServiceInterface {

    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task findById(int id) {
        Optional<Task> result = taskRepository.findById(id);

        Task task;

        if (result.isPresent()) {
            task = result.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }

        return task;
    }

    @Override
    public void save(Task task) {
        // Make sure id is not set by user
        task.setId(0);

        taskRepository.save(task);
    }

    @Override
    public void update(Task task) {
        if (!taskRepository.existsById(task.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not updated");
        }

        taskRepository.save(task);
    }

    @Override
    public void deleteById(int id) {
        taskRepository.deleteById(id);
    }
}
