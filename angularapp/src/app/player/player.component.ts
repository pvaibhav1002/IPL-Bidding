import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  @Input() players: Player[] = [];
  @Output() createPlayerEvent = new EventEmitter<Player>();
  @Output() editPlayerEvent = new EventEmitter<Player>();
  @Output() saveEditedPlayerEvent = new EventEmitter<Player>();
  @Output() cancelEditPlayerEvent = new EventEmitter<void>();
  @Output() deletePlayerEvent = new EventEmitter<number>();

  newPlayer: Player = {};
  editedPlayer: Player | null = null;

  onEditPlayer(player: Player) { this.editPlayerEvent.emit(player); }
  onSaveEditedPlayer() { if (this.editedPlayer) { this.saveEditedPlayerEvent.emit(this.editedPlayer); this.editedPlayer = null; } }
  onCancelEditPlayer() { this.editedPlayer = null; this.cancelEditPlayerEvent.emit(); }
  onDeletePlayer(id: number) { this.deletePlayerEvent.emit(id); }
  createPlayer() { if (this.newPlayer.name && this.newPlayer.biddingPrice) { this.createPlayerEvent.emit(this.newPlayer); this.newPlayer = {}; } }

  biddingPriceStatus(): string {
    return this.newPlayer.biddingPrice && this.newPlayer.biddingPrice > 500
      ? 'High price'
      : 'Reasonable price';
  }
}
