import type { ComponentProps } from 'react';

import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export const IconLibraryName = {
  IONICONS: 'Ionicons',
  FONTAWESOME: 'FontAwesome',
  MATERIAL_COMMUNITY: 'MaterialCommunityIcons',
  FEATHER: 'Feather',
} as const;
export type IconLibraryName = (typeof IconLibraryName)[keyof typeof IconLibraryName];

export const ICON_LIBRARIES = {
  [IconLibraryName.IONICONS]: Ionicons,
  [IconLibraryName.FONTAWESOME]: FontAwesome,
  [IconLibraryName.MATERIAL_COMMUNITY]: MaterialCommunityIcons,
  [IconLibraryName.FEATHER]: Feather,
};

export const DEFAULT_ICON_LIBRARY: IconLibraryName = IconLibraryName.IONICONS;

export type IconName = ComponentProps<(typeof ICON_LIBRARIES)[IconLibraryName]>['name'];
