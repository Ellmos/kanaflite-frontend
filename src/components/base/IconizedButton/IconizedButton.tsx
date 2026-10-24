import { Text, View, TouchableOpacity } from 'react-native';

import Color from 'color';

import Icon from '@components/base/Icon';
import type { IconName } from '@type/icons';

import IconizedButtonStyles from './IconizedButton.css';

type IconizedButtonProps = {
  title: string;
  subtitle: string;
  iconName: IconName;
  iconColor: string;
  onPress: () => void;
};

const IconizedButton = ({ title, subtitle, iconName, iconColor, onPress }: IconizedButtonProps) => {
  const iconBackground = Color(iconColor).alpha(0.1).string();

  return (
    <TouchableOpacity style={IconizedButtonStyles.wrapper} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor}
          library='Feather'
          style={[IconizedButtonStyles.icon, { backgroundColor: iconBackground }]}
        />
        <View>
          <Text style={IconizedButtonStyles.title}>{title}</Text>
          <Text style={IconizedButtonStyles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IconizedButton;
