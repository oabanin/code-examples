import BothIcon from 'public/svg/profile/my-preferences/risk/both.svg';
import CreationIcon from 'public/svg/profile/my-preferences/risk/creation.svg';
import HighIcon from 'public/svg/profile/my-preferences/risk/high.svg';
import LowModerateIcon from 'public/svg/profile/my-preferences/risk/low-moderate.svg';
import LowIcon from 'public/svg/profile/my-preferences/risk/low.svg';
import ModerateHighIcon from 'public/svg/profile/my-preferences/risk/moderate-high.svg';
import ModerateIcon from 'public/svg/profile/my-preferences/risk/moderate.svg';
import PreservationIcon from 'public/svg/profile/my-preferences/risk/preservation.svg';

export const formRiskData = [
  {
    label: 'low',
    subtitle: 'lowText',
    icon: <LowIcon />,
    value: 'low',
  },
  {
    label: 'lowModerate',
    subtitle: 'lowModerateText',
    icon: <LowModerateIcon />,
    value: 'low_moderate',
  },
  {
    label: 'moderate',
    subtitle: 'moderateText',
    icon: <ModerateIcon />,
    value: 'moderate',
  },
  {
    label: 'moderateHigh',
    subtitle: 'moderateHighText',
    icon: <ModerateHighIcon />,
    value: 'moderate_high',
  },
  {
    label: 'high',
    subtitle: 'highText',
    icon: <HighIcon />,
    value: 'high',
  },
];

export const formWealthData = [
  {
    label: 'creation',
    icon: <CreationIcon />,
    value: 'creation',
  },
  {
    label: 'preservation',
    icon: <PreservationIcon />,
    value: 'preservation',
  },
  {
    label: 'both',
    icon: <BothIcon />,
    value: 'both',
  },
];
