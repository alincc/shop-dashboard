export interface SettingsProperty {
  [key: string]: string,
};

export interface ISettings {
  nrOfDecimals: number;
  maintenanceMode: boolean;
  maintenanceText: string;
  displayProductQty: boolean;
};

export class Settings implements ISettings {
  nrOfDecimals: number;
  maintenanceMode: boolean;
  maintenanceText: string;
  displayProductQty: boolean;

  constructor(settings: ISettings) {
    this.nrOfDecimals = settings.nrOfDecimals;
    this.maintenanceMode = settings.maintenanceMode;
    this.maintenanceText = settings.maintenanceText;
    this.displayProductQty = settings.displayProductQty;
  }
}
