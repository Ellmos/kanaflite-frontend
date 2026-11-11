import DrawingResultModal from '@modal/components/DrawingResultModal';
import { selectModalNotification } from '@modal/core/slice';
import { ModalNotification, ModalVariant } from '@modal/type';
import { useAppSelector } from '@store/hooks';

type ModalVariantComponentProps = {
  notification: ModalNotification;
};
const ModalVariantComponent = ({ notification }: ModalVariantComponentProps) => {
  switch (notification.variant) {
    case ModalVariant.DrawingResult:
      return <DrawingResultModal {...notification.payload} />;
  }
};

const ModalLauncher = () => {
  const notification = useAppSelector(selectModalNotification);

  if (!notification) {
    return null;
  }

  return <ModalVariantComponent notification={notification} />;
};

export default ModalLauncher;
