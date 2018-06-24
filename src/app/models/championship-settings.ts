export class ChampionshipSettings {
  id: number;
  alias: string;
  championshipId: number;
  treeType: number;
  fightingAreas: number;
  fightDuration: string;
  hasPreliminary: boolean;
  preliminaryGroupSize: number;
  preliminaryDuration: string;
  preliminaryWinner: number;
  hasEncho: boolean;
  enchoQty: number;
  enchoDuration: string;
  hasHantei: boolean;
  cost: number;
  seedQuantity: number;
  hanteiLimit: number;
  enchoGoldPoint: number;
  limitByEntity: number;

  constructor() {
    this.fightingAreas = 1;
    this.fightDuration = '05:00';
    this.hasPreliminary = true;
    this.preliminaryGroupSize = 3;
    this.preliminaryDuration = '05:00';
    this.preliminaryWinner = 1;
    this.hasEncho = true;
    this.enchoQty = 1;
    this.enchoDuration = '0';
    this.hasHantei = false;
    this.hanteiLimit = 0;
    this.enchoGoldPoint = 0;
    this.limitByEntity = 4;
    this.cost = 0;
    this.treeType = 1;
    this.seedQuantity = 4;
  }
}
