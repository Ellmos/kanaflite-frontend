import { DrawingResultModalProps } from './components/DrawingResultModal';

export const ModalVariant = {
  DrawingResult: 'DrawingResult',
} as const;

export type ModalVariant = (typeof ModalVariant)[keyof typeof ModalVariant];

type PayloadByVariant = {
  [ModalVariant.DrawingResult]: DrawingResultModalProps;
};

export type ModalNotification = {
  [K in ModalVariant]: {
    variant: K;
    payload: PayloadByVariant[K];
  };
}[ModalVariant];
