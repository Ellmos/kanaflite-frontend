import React from 'react';

import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export const iconLibraries = {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
};

export type IconLibraries = keyof typeof iconLibraries;

export type IconName = React.ComponentProps<(typeof iconLibraries)[IconLibraries]>['name'];
