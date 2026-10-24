import { TextProps } from 'react-native';

import { ICON_LIBRARIES, IconLibraryName, IconName } from '@type/icons';

export type IconProps = TextProps & {
  name: IconName;
  size?: number;
  color?: string;
  library?: IconLibraryName;
};

export default function Icon({ name, size, color, library, ...rest }: IconProps) {
  let IconComponent;

  if (library) {
    IconComponent = ICON_LIBRARIES[library];
  } else {
    for (const libName of Object.values(IconLibraryName)) {
      const lib = ICON_LIBRARIES[libName];
      if (name in lib.getRawGlyphMap()) {
        IconComponent = lib;
        break;
      }
    }
  }

  // @ts-expect-error - TypeScript can't infer the correct type for the icon name, but we know it's valid.
  return <IconComponent name={name} size={size} color={color} {...rest} />;
}
