import { TouchableOpacity } from 'react-native';

import Icon from '@components/base/Icon';
import { IconName } from '@type/icons';

import IconButtonStyles from './IconButton.css';

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  highlighted?: boolean;
  disabled?: boolean;
};

const IconButton = ({ icon, onPress, highlighted = true, disabled = false }: IconButtonProps) => {
  IconButtonStyles.useVariants({ disabled, highlighted });
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={IconButtonStyles.button}>
      <Icon name={icon} size={22} color={IconButtonStyles.icon.color} />
    </TouchableOpacity>
  );
};

export default IconButton;
