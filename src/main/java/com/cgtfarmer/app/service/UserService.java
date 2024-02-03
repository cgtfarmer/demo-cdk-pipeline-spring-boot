package com.cgtfarmer.app.service;

import com.cgtfarmer.app.entity.User;
import com.cgtfarmer.app.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> findAll() {
    return this.userRepository.findAll();
  }

  public User findById(int id) {
    return this.userRepository.findById(id);
  }

  public User create(User user) {
    return this.userRepository.create(user);
  }

  public User update(User user) {
    return this.userRepository.update(user);
  }

  public void destroy(int id) {
    this.userRepository.destroy(id);
  }
}
