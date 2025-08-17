package me.pvaibhav.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.pvaibhav.springapp.entity.Player;

@Repository
public interface PlayerRepo extends JpaRepository<Player, Long> {
    List<Player> findBySold(boolean sold);
}
