package com.azdanov.pawatask.service;

import com.azdanov.pawatask.domain.Task;
import java.util.List;

public interface TaskServiceInterface {

    List<Task> findAll();

    Task findById(int id);

    void save(Task task);

    void update(Task task);

    void deleteById(int id);
}
