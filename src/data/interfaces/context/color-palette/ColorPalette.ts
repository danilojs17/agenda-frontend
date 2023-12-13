export type IColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface IColorPaletteConext {
  color: IColor;
  changeColor: (color: IColor) => void;
}
