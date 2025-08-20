import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  @Input() players: Player[] = [];
  @Input() playerSuccessMessage: string = "";
  @Output() createPlayerEvent = new EventEmitter<Player>();
  @Output() editPlayerEvent = new EventEmitter<Player>();
  @Output() saveEditedPlayerEvent = new EventEmitter<Player>();
  @Output() cancelEditPlayerEvent = new EventEmitter<void>();
  @Output() deletePlayerEvent = new EventEmitter<number>();

  newPlayer: Player = {};
  @Input() editedPlayer: Player | null = null;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerSuccessMessage'] && this.playerSuccessMessage) {
      setTimeout(() => {
        this.playerSuccessMessage = "";
      }, 2000);
    }
  }


  onEditPlayer(player: Player) { this.editPlayerEvent.emit(player); }
  onSaveEditedPlayer() { if (this.editedPlayer) { this.saveEditedPlayerEvent.emit(this.editedPlayer); this.editedPlayer = null; } }
  onCancelEditPlayer() { this.editedPlayer = null; this.cancelEditPlayerEvent.emit(); }
  onDeletePlayer(id: number) { this.deletePlayerEvent.emit(id); }
  createPlayer() { if (this.newPlayer.name && this.newPlayer.biddingPrice) { this.createPlayerEvent.emit(this.newPlayer); this.newPlayer = {}; } }

  biddingPriceStatus(): string {
    return "";
  }
}