package com.cgtfarmer.app.repository;

import com.cgtfarmer.app.entity.User;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

  private final List<User> users;

  private int counter;

  public UserRepository() {
    this.users = new ArrayList<User>();

    this.counter = 0;
  }

  public List<User> findAll() {
    return this.users;
  }

  public User findById(int id) {
    int index = this.findUserIndexById(id);

    return this.users.get(index);
  }

  public User create(User user) {
    int id = this.counter;

    user.setId(id);

    this.users.add(user);

    this.counter += 1;
    return user;
  }

  public User update(User user) {
    int index = this.findUserIndexById(user.getId());

    this.users.set(index, user);

    return user;
  }

  public void destroy(int id) {
    int index = this.findUserIndexById(id);

    this.users.remove(index);
  }

  private int findUserIndexById(int id) {
    for (int i = 0; i < this.users.size(); i++) {
      User user = this.users.get(i);

      if (user.getId() == id) {
        return i;
      }
    }

    return -1;
  }
}
