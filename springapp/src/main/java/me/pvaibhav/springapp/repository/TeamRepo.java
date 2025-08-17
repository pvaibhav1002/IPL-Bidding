package me.pvaibhav.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.pvaibhav.springapp.entity.Team;

@Repository
public interface TeamRepo extends JpaRepository<Team,Long> {

}
