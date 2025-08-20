import { Player } from "./player.model";

export interface Team{
    id?:number;
    name?:string;
    maximumBudget?:any;
    players?:Player[];
}