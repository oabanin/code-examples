import AnalystIcon from 'public/svg/profile/my-preferences/about-me/analyst.svg';
import AngelInvestorIcon from 'public/svg/profile/my-preferences/about-me/angel-investor.svg';
import BusinessOwnerIcon from 'public/svg/profile/my-preferences/about-me/business-owner.svg';
import CollectiblesIcon from 'public/svg/profile/my-preferences/about-me/collectibles-investor.svg';
import EntrepreneurIcon from 'public/svg/profile/my-preferences/about-me/entrepreneur.svg';
import FamilyOfficeIcon from 'public/svg/profile/my-preferences/about-me/family-office.svg';
import FinancialAdviserIcon from 'public/svg/profile/my-preferences/about-me/financial-adviser.svg';
import FundManagerIcon from 'public/svg/profile/my-preferences/about-me/fund-manager.svg';
import NewsIcon from 'public/svg/profile/my-preferences/about-me/news.svg';
import PrivateInvestorIcon from 'public/svg/profile/my-preferences/about-me/private-investor.svg';
import RealEstateIcon from 'public/svg/profile/my-preferences/about-me/real-estate-investor.svg';
import RetiredIcon from 'public/svg/profile/my-preferences/about-me/retired.svg';
import StockInvestorIcon from 'public/svg/profile/my-preferences/about-me/stock-investor.svg';

export const formAboutMeData = [
  {
    label: 'readNews',
    icon: <NewsIcon />,
    value: 'like_read_news',
  },
  {
    label: 'privateInvestor',
    icon: <PrivateInvestorIcon />,
    value: 'private_investor',
  },
  {
    label: 'entrepreneur',
    icon: <EntrepreneurIcon />,
    value: 'entrepreneur',
  },
  {
    label: 'stockInvestor',
    icon: <StockInvestorIcon />,
    value: 'stock_investor',
  },
  {
    label: 'angelInvestor',
    icon: <AngelInvestorIcon />,
    value: 'angel_investor',
  },
  {
    label: 'realEstate',
    icon: <RealEstateIcon />,
    value: 'read_estate_investor',
  },
  {
    label: 'financialAdviser',
    icon: <FinancialAdviserIcon />,
    value: 'financial_adviser',
  },
  {
    label: 'fundManager',
    icon: <FundManagerIcon />,
    value: 'fund_manager',
  },
  {
    label: 'businessOwner',
    icon: <BusinessOwnerIcon />,
    value: 'business_owner',
  },
  {
    label: 'retired',
    icon: <RetiredIcon />,
    value: 'retired',
  },
  {
    label: 'collectibles_investor',
    icon: <CollectiblesIcon />,
    value: 'collectibles_investor',
  },
  {
    label: 'analyst',
    icon: <AnalystIcon />,
    value: 'analyst',
  },
  {
    label: 'familyOffice',
    icon: <FamilyOfficeIcon />,
    value: 'family_office',
  },
];
