import { Text, View, TouchableOpacity } from 'react-native';

import Color from 'color';

import Icon from '@components/base/Icon';
import type { IconName } from '@type/icons';

import ButtonWithIconStyles from './ButtonWithIcon.css';

type ButtonWithIconProps = {
  title: string;
  subtitle: string;
  iconName: IconName;
  iconColor: string;
  onPress: () => void;
};

const ButtonWithIcon = ({ title, subtitle, iconName, iconColor, onPress }: ButtonWithIconProps) => {
  const iconBackground = Color(iconColor).alpha(0.1).string();

  return (
    <TouchableOpacity style={ButtonWithIconStyles.wrapper} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor}
          library='Feather'
          style={[ButtonWithIconStyles.icon, { backgroundColor: iconBackground }]}
        />
        <View>
          <Text style={ButtonWithIconStyles.title}>{title}</Text>
          <Text style={ButtonWithIconStyles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
