import { Text, TextProps } from 'react-native';

import TypographyStyles from './Typography.css';

type TypographyProps = TextProps;

const Typography = ({ style, ...rest }: TypographyProps) => {
  TypographyStyles.useVariants({ color: 'defaut' });
  return <Text style={[TypographyStyles.text, style]} {...rest} />;
};

export default Typography;
