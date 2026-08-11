import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Color from 'color';

import { Palette } from '@constants/colors';
import { IconName } from '@definitions/Icons';
import { useThemeColors } from '@hooks/useThemeColor';
import Icon from 'components/Icon';

type Props = {
  title: string;
  subtitle: string;
  iconName: IconName;
  iconColor: string;
  onPress: () => void;
};

export default function SelectModeButton({ title, subtitle, iconName, iconColor, onPress }: Props) {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const iconBackground = Color(iconColor).alpha(0.05).string();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor}
          library="Feather"
          style={[styles.icon, { backgroundColor: iconBackground }]}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bgLight,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: colors.border,
      elevation: 2,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.textMuted,
      fontSize: 14,
    },
    icon: {
      marginRight: 12,
      padding: 10,
      borderRadius: 10,
    },
  });
