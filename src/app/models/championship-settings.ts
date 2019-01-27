export class ChampionshipSettings {
  id: number;
  alias: string;
  championship_id: number;
  treeType: number;
  fightingAreas: number;
  fightDuration: string;
  hasPreliminary: number;
  preliminaryGroupSize: number;
  preliminaryDuration: string;
  preliminaryWinner: number;
  hasEncho: number;
  enchoQty: number;
  enchoDuration: string;
  hasHantei: number;
  cost: number;
  seedQuantity: number;
  hanteiLimit: number;
  enchoGoldPoint: number;
  limitByEntity: number;

  constructor() {
    this.fightingAreas = 1;
    this.fightDuration = '05:00';
    this.hasPreliminary = 1;
    this.preliminaryGroupSize = 3;
    this.preliminaryDuration = '05:00';
    this.preliminaryWinner = 1;
    this.hasEncho = 1;
    this.enchoQty = 1;
    this.enchoDuration = '0';
    this.hasHantei = 0;
    this.hanteiLimit = 0;
    this.enchoGoldPoint = 0;
    this.limitByEntity = 4;
    this.cost = 0;
    this.treeType = 1;
    this.seedQuantity = 4;
  }
}
