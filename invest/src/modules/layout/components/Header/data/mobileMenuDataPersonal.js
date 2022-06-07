import AdvisersIcon from 'public/svg/layout/header/burger-menu/advisers.svg';
import CompaniesIcon from 'public/svg/layout/header/burger-menu/companies.svg';
import EventsIcon from 'public/svg/layout/header/burger-menu/events.svg';
import FeedIcon from 'public/svg/layout/header/burger-menu/feed.svg';
import InsightsIcon from 'public/svg/layout/header/burger-menu/insights.svg';
import NewsIcon from 'public/svg/layout/header/burger-menu/news.svg';
import OffersIcon from 'public/svg/layout/header/burger-menu/offers.svg';
import ReportsIcon from 'public/svg/layout/header/burger-menu/reports.svg';

export const mobileMenuDataPersonalPart1 = [
  {
    name: 'Inbox',
    path: '/inbox',
    icon: <NewsIcon />,
  },
  {
    name: 'Offers',
    path: '/Offers',
    icon: <OffersIcon />,
  },
];

export const mobileMenuDataPersonalPart2 = [
  {
    name: 'Insights',
    path: '/insights',
    icon: <InsightsIcon />,
  },
  {
    name: 'Events',
    path: '/events',
    icon: <EventsIcon />,
  },
  {
    name: 'Feed',
    path: '/feed',
    icon: <FeedIcon />,
  },
  {
    name: 'Company',
    path: '/company',
    icon: <CompaniesIcon />,
  },
  {
    name: 'People',
    path: '/people',
    icon: <AdvisersIcon />,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: <ReportsIcon />,
  },
];
