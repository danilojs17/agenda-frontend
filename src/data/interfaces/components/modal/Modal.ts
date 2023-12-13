import { ITodoCrud } from '@interface/context/to-do/ToDo'

export interface IModal {
  isOpen: boolean;
  defaultValue: Partial<ITodoCrud>
  onOpenChange: () => void;
  onAction: (data: ITodoCrud) => void;
}
