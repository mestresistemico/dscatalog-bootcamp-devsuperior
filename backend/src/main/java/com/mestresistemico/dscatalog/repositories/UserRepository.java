package com.mestresistemico.dscatalog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mestresistemico.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	@Query("SELECT obj FROM User obj JOIN FETCH obj.roles WHERE obj IN :users")
	List<User> findUserRoles(List<User> users);
	
	User findByEmail(String email); 

}
