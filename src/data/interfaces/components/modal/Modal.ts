import { IHandlerQuote, IQuote } from '@interface/context/quotes/Quotes'

export interface IModal {
  isOpen: boolean;
  onOpenChange: () => void;
  defaultValue: Partial<IQuote>;
  onAction: (data: IHandlerQuote) => void;
  onClose: () => void;
  option: 'delete' | 'program';
}
