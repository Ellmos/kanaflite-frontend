import React from 'react';
import { TextProps } from 'react-native';

import { IconName, IconLibraries, iconLibraries } from '@definitions/Icons';

function getIconComponent(icon: IconName) {
  for (const library in iconLibraries) {
    const component = iconLibraries[library as IconLibraries];

    if (icon in component.glyphMap) {
      return component;
    }
  }

  throw new Error(`Icon "${icon}" not found in any icon library.`);
}

export type IconProps = TextProps & {
  name: IconName;
  size?: number;
  color?: string;
  library?: IconLibraries;
};

export default function Icon({ name, size, color, library, ...rest }: IconProps) {
  let IconComponent;

  if (!library) {
    IconComponent = getIconComponent(name);
  } else {
    IconComponent = iconLibraries[library];
    if (!(name in IconComponent.glyphMap)) {
      throw new Error(`Icon "${name}" not found in library "${library}".`);
    }
  }

  // @ts-expect-error - TypeScript can't infer the correct type for the icon name, but we know it's valid.
  return <IconComponent name={name} size={size} color={color} {...rest} />;
}
