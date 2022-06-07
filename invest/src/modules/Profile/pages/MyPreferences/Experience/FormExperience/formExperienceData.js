import ActiveIcon from 'public/svg/profile/my-preferences/experience/active.svg';
import AdvancedIcon from 'public/svg/profile/my-preferences/experience/advanced.svg';
import BrowsingIcon from 'public/svg/profile/my-preferences/experience/browsing.svg';
import InactiveIcon from 'public/svg/profile/my-preferences/experience/inactive.svg';
import IntermediateIcon from 'public/svg/profile/my-preferences/experience/intermediate.svg';
import NoviceIcon from 'public/svg/profile/my-preferences/experience/novice.svg';

export const formExperienceData = [
  {
    label: 'novice',
    subtitle: 'noviceText',
    icon: <NoviceIcon />,
    value: 'novice',
  },
  {
    label: 'intermediate',
    subtitle: 'intermediateText',
    icon: <IntermediateIcon />,
    value: 'intermediate',
  },
  {
    label: 'advanced',
    subtitle: 'advancedText',
    icon: <AdvancedIcon />,
    value: 'advanced',
  },
];

export const formStatusData = [
  {
    label: 'active',
    subtitle: 'activeText',
    icon: <ActiveIcon />,
    value: 'active',
  },
  {
    label: 'browsing',
    subtitle: 'browsingText',
    icon: <BrowsingIcon />,
    value: 'browsing',
  },
  {
    label: 'inactive',
    subtitle: 'inactiveText',
    icon: <InactiveIcon />,
    value: 'inactive',
  },
];
