package com.azdanov.pawatask.repository;

import com.azdanov.pawatask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {}
