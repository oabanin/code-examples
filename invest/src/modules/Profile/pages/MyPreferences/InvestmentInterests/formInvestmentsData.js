import BankProductsIcon from 'public/svg/profile/my-preferences/investments-interests/bank-products.svg';
import BondsIcon from 'public/svg/profile/my-preferences/investments-interests/bonds.svg';
import BusinessesForSaleIcon from 'public/svg/profile/my-preferences/investments-interests/businesses-for-sale.svg';
import CommoditiesIcon from 'public/svg/profile/my-preferences/investments-interests/commodities.svg';
import CryptocurrencyIcon from 'public/svg/profile/my-preferences/investments-interests/cryptocurrency.svg';
import InsuranceIcon from 'public/svg/profile/my-preferences/investments-interests/insurance.svg';
import ManagedFundsIcon from 'public/svg/profile/my-preferences/investments-interests/managed-funds.svg';
import MiscellaneousIcon from 'public/svg/profile/my-preferences/investments-interests/miscellaneous.svg';
import PrivateEquityIcon from 'public/svg/profile/my-preferences/investments-interests/private-equity.svg';
import RealEstateIcon from 'public/svg/profile/my-preferences/investments-interests/real-estate.svg';
import StocksIcon from 'public/svg/profile/my-preferences/investments-interests/stocks.svg';

export const formInvestmentsData = {
  managed_funds: {
    label: 'InvestmentsInterests.managedFunds',
    icon: <ManagedFundsIcon />,
    data: [
      {
        label: 'InvestmentsInterests.exchange_traded',
        value: 'exchange_traded_funds',
      },
      {
        label: 'InvestmentsInterests.fixed_funds',
        value: 'fixed_income_funds',
      },
      {
        label: 'InvestmentsInterests.equities_funds',
        value: 'equities_funds',
      },
      {
        label: 'InvestmentsInterests.balanced_funds',
        value: 'balanced_funds',
      },
      {
        label: 'InvestmentsInterests.private_equity_funds',
        value: 'private_equity_funds',
      },
      {
        label: 'InvestmentsInterests.property_funds',
        value: 'property_funds',
      },
      {
        label: 'InvestmentsInterests.mortgage_funds',
        value: 'mortgage_funds',
      },
      {
        label: 'InvestmentsInterests.impact_funds',
        value: 'impact_funds',
      },
      {
        label: 'InvestmentsInterests.index_funds',
        value: 'index_funds',
      },
      {
        label: 'InvestmentsInterests.cash_funds',
        value: 'cash_funds',
      },
      {
        label: 'InvestmentsInterests.construction_funds',
        value: 'construction_funds',
      },
      {
        label: 'InvestmentsInterests.speciality_funds',
        value: 'speciality_funds',
      },
    ],
  },
  bonds: {
    label: 'InvestmentsInterests.bonds',
    icon: <BondsIcon />,
    data: [
      {
        label: 'InvestmentsInterests.treasury_bonds',
        value: 'treasury_bonds',
      },
      {
        label: 'InvestmentsInterests.corporate_bonds',
        value: 'corporate_bonds',
      },
      {
        label: 'InvestmentsInterests.government_bonds',
        value: 'government_bonds',
      },
      {
        label: 'InvestmentsInterests.retail_bonds',
        value: 'retail_bonds',
      },
      {
        label: 'InvestmentsInterests.municipal_bonds',
        value: 'municipal_bonds',
      },
      {
        label: 'InvestmentsInterests.foreign_bonds',
        value: 'foreign_bonds',
      },
      {
        label: 'InvestmentsInterests.mortgage_backed_bonds',
        value: 'mortgage_backed_bonds',
      },
      {
        label: 'InvestmentsInterests.emerging_markets_bonds',
        value: 'emerging_markets_bonds',
      },
    ],
  },
  private_equity: {
    label: 'InvestmentsInterests.private_equity',
    icon: <PrivateEquityIcon />,
    data: [
      {
        label: 'InvestmentsInterests.start_ups',
        value: 'start_ups',
      },
      {
        label: 'InvestmentsInterests.early_stage_companies',
        value: 'early_stage_companies',
      },
      {
        label: 'InvestmentsInterests.ipos',
        value: 'ipos',
      },
      {
        label: 'InvestmentsInterests.pre_ipo_companies',
        value: 'pre_ipo_companies',
      },
      {
        label: 'InvestmentsInterests.mature_companies',
        value: 'mature_companies',
      },
      {
        label: 'InvestmentsInterests.venture_capital',
        value: 'venture_capital',
      },
      {
        label: 'InvestmentsInterests.buyouts',
        value: 'buyouts',
      },
    ],
  },
  stocks: {
    label: 'InvestmentsInterests.stocks',
    icon: <StocksIcon />,
    data: [
      {
        label: 'InvestmentsInterests.small_cap_stocks',
        value: 'small_cap_stocks',
      },
      {
        label: 'InvestmentsInterests.mid_cap_stocks',
        value: 'mid_cap_stocks',
      },
      {
        label: 'InvestmentsInterests.large_cap_blue_chip_stocks',
        value: 'large_cap_blue_chip_stocks',
      },
      {
        label: 'InvestmentsInterests.listed_investment_companies_l_ics_',
        value: 'listed_investment_companies',
      },
      {
        label: 'InvestmentsInterests.dividend_stocks',
        value: 'dividend_stocks',
      },
      {
        label: 'InvestmentsInterests.technology_stocks',
        value: 'technology_stocks',
      },
      {
        label: 'InvestmentsInterests.bank_stocks',
        value: 'bank_stocks',
      },
      {
        label: 'InvestmentsInterests.real_estate_stocks',
        value: 'real_estate_stocks',
      },
      {
        label: 'InvestmentsInterests.financial_services_stocks',
        value: 'financial_services_stocks',
      },
      {
        label: 'InvestmentsInterests.mining_stocks',
        value: 'mining_stocks',
      },
      {
        label: 'InvestmentsInterests.infrastructure_stocks',
        value: 'infrastructure_stocks',
      },
      {
        label: 'InvestmentsInterests.gaming_wagering_stocks',
        value: 'gaming_and_wagering_stocks',
      },
      {
        label: 'InvestmentsInterests.agriculture_stocks',
        value: 'agriculture_stocks',
      },
      {
        label: 'InvestmentsInterests.energy_stocks',
        value: 'energy_stocks',
      },
      {
        label: 'InvestmentsInterests.telecommunication_stocks',
        value: 'telecommunication_stocks',
      },
      {
        label: 'InvestmentsInterests.media_advertising_stocks',
        value: 'media_and_advertising_stocks',
      },
      {
        label: 'InvestmentsInterests.professional_services_stocks',
        value: 'professional_services_stocks',
      },
      {
        label: 'InvestmentsInterests.education_stocks',
        value: 'education_stocks',
      },
      {
        label: 'InvestmentsInterests.defence_stocks',
        value: 'Defence_stocks',
      },
      {
        label: 'InvestmentsInterests.health_medical_stocks',
        value: 'health_and_medical_stocks',
      },
      {
        label: 'InvestmentsInterests.tourism_hospitality_stocks',
        value: 'tourism_and_hospitality_stocks',
      },
      {
        label: 'InvestmentsInterests.insurance_stocks',
        value: 'insurance_stocks',
      },
      {
        label: 'InvestmentsInterests.legal_stocks',
        value: 'legal_stocks',
      },
      {
        label: 'InvestmentsInterests.transport_logistics_stocks',
        value: 'transport_and_logistics_stocks',
      },
      {
        label: 'InvestmentsInterests.retail_consumer_goods_stocks',
        value: 'retail_and_consumer_goods_stocks',
      },
      {
        label: 'InvestmentsInterests.pharmaceutical_stocks',
        value: 'pharmaceutical_stocks',
      },
      {
        label: 'InvestmentsInterests.sport_recreation_stocks',
        value: 'sport_and_recreation_stocks',
      },
    ],
  },
  bank_products: {
    label: 'InvestmentsInterests.bankProducts',
    icon: <BankProductsIcon />,
    data: [
      {
        label: 'InvestmentsInterests.savings_accounts',
        value: 'savings_accounts',
      },
      {
        label: 'InvestmentsInterests.certificates_of_deposit_term_deposits_time_deposits',
        value: 'certificates_of_deposit',
      },
      {
        label: 'InvestmentsInterests.money_market_accounts',
        value: 'money_market_accounts',
      },
      {
        label: 'InvestmentsInterests.credit_cards',
        value: 'credit_cards',
      },
      {
        label: 'InvestmentsInterests.home_loans',
        value: 'home_loans',
      },
      {
        label: 'InvestmentsInterests.car_loans',
        value: 'car_loans',
      },
      {
        label: 'InvestmentsInterests.business_loans',
        value: 'bp_business_loans',
      },
      {
        label: 'InvestmentsInterests.boat_loans',
        value: 'boat_loans',
      },
    ],
  },
  cryptocurrency: {
    label: 'InvestmentsInterests.cryptocurrency',
    icon: <CryptocurrencyIcon />,
    data: [
      {
        label: 'InvestmentsInterests.bitcoin',
        value: 'bitcoin',
      },
      {
        label: 'InvestmentsInterests.ethereum',
        value: 'ethereum',
      },
      {
        label: 'InvestmentsInterests.blockchain_projects',
        value: 'blockchain_projects',
      },
      {
        label: 'InvestmentsInterests.altcoins',
        value: 'altcoins',
      },
      {
        label: 'InvestmentsInterests.non_fungible_tokens_n_fts_',
        value: 'non_fungible_tokens',
      },
      {
        label: 'InvestmentsInterests.de_fi_decentralized_finance_',
        value: 'decentralized_finance',
      },
      {
        label: 'InvestmentsInterests.game_fi_p2e_games_play_to_earn_games_',
        value: 'play_to_earn_games',
      },
      {
        label: 'InvestmentsInterests.stablecoins',
        value: 'stablecoins',
      },
      {
        label: 'InvestmentsInterests.metaverse',
        value: 'metaverse',
      },
      {
        label: 'InvestmentsInterests.privacy_coins',
        value: 'privacy_coins',
      },
    ],
  },
  commodities: {
    label: 'InvestmentsInterests.commodities',
    icon: <CommoditiesIcon />,
    data: [
      {
        label: 'InvestmentsInterests.gold',
        value: 'gold',
      },
      {
        label: 'InvestmentsInterests.silver',
        value: 'silver',
      },
      {
        label: 'InvestmentsInterests.crude_oil',
        value: 'crude_oil',
      },
      {
        label: 'InvestmentsInterests.natural_gas',
        value: 'natural_gas',
      },
      {
        label: 'InvestmentsInterests.wheat',
        value: 'wheat',
      },
      {
        label: 'InvestmentsInterests.cotton',
        value: 'cotton',
      },
      {
        label: 'InvestmentsInterests.corn',
        value: 'corn',
      },
      {
        label: 'InvestmentsInterests.sugar',
        value: 'sugar',
      },
      {
        label: 'InvestmentsInterests.copper',
        value: 'copper',
      },
      {
        label: 'InvestmentsInterests.iron_ore',
        value: 'iron_ore',
      },
      {
        label: 'InvestmentsInterests.soybean',
        value: 'soybean',
      },
      {
        label: 'InvestmentsInterests.milk',
        value: 'milk',
      },
      {
        label: 'InvestmentsInterests.cocoa',
        value: 'cocoa',
      },
      {
        label: 'InvestmentsInterests.coffee',
        value: 'coffee',
      },
      {
        label: 'InvestmentsInterests.ethanol',
        value: 'ethanol',
      },
      {
        label: 'InvestmentsInterests.propane',
        value: 'propane',
      },
      {
        label: 'InvestmentsInterests.pulp',
        value: 'pulp',
      },
      {
        label: 'InvestmentsInterests.lead',
        value: 'lead',
      },
      {
        label: 'InvestmentsInterests.zinc',
        value: 'zinc',
      },
      {
        label: 'InvestmentsInterests.tin',
        value: 'tin',
      },
      {
        label: 'InvestmentsInterests.uranium',
        value: 'uranium',
      },
      {
        label: 'InvestmentsInterests.aluminium',
        value: 'aluminium',
      },
      {
        label: 'InvestmentsInterests.aluminium_alloy',
        value: 'aluminium_alloy',
      },
      {
        label: 'InvestmentsInterests.nickel',
        value: 'nickel',
      },
      {
        label: 'InvestmentsInterests.cobalt',
        value: 'cobalt',
      },
      {
        label: 'InvestmentsInterests.platinum',
        value: 'platinum',
      },
      {
        label: 'InvestmentsInterests.palladium',
        value: 'palladium',
      },
      {
        label: 'InvestmentsInterests.palm_oil',
        value: 'palm_oil',
      },
      {
        label: 'InvestmentsInterests.rubber',
        value: 'rubber',
      },
      {
        label: 'InvestmentsInterests.amber',
        value: 'amber',
      },
      {
        label: 'InvestmentsInterests.barley',
        value: 'barley',
      },
      {
        label: 'InvestmentsInterests.flaxseed',
        value: 'flaxseed',
      },
      {
        label: 'InvestmentsInterests.oat',
        value: 'oat',
      },
      {
        label: 'InvestmentsInterests.olive_oil',
        value: 'olive_oil',
      },
      {
        label: 'InvestmentsInterests.peanut_oil',
        value: 'peanut_oil',
      },
      {
        label: 'InvestmentsInterests.potatoes',
        value: 'potatoes',
      },
      {
        label: 'InvestmentsInterests.rapeseed',
        value: 'rapeseed',
      },
      {
        label: 'InvestmentsInterests.rice',
        value: 'rice',
      },
      {
        label: 'InvestmentsInterests.rye',
        value: 'rye',
      },
      {
        label: 'InvestmentsInterests.tea',
        value: 'tea',
      },
      {
        label: 'InvestmentsInterests.ambergris',
        value: 'ambergris',
      },
      {
        label: 'InvestmentsInterests.bristle',
        value: 'bristle',
      },
      {
        label: 'InvestmentsInterests.butter',
        value: 'butter',
      },
      {
        label: 'InvestmentsInterests.cashmere',
        value: 'cashmere',
      },
      {
        label: 'InvestmentsInterests.civet',
        value: 'civet',
      },
      {
        label: 'InvestmentsInterests.feathers',
        value: 'feathers',
      },
      {
        label: 'InvestmentsInterests.feeder_cattle',
        value: 'feeder_cattle',
      },
      {
        label: 'InvestmentsInterests.lean_hog',
        value: 'lean_hog',
      },
      {
        label: 'InvestmentsInterests.live_cattle',
        value: 'live_cattle',
      },
      {
        label: 'InvestmentsInterests.goats',
        value: 'goats',
      },
      {
        label: 'InvestmentsInterests.hide_skin_',
        value: 'hide_skin',
      },
      {
        label: 'InvestmentsInterests.horses',
        value: 'horses',
      },
      {
        label: 'InvestmentsInterests.ivory',
        value: 'ivory',
      },
      {
        label: 'InvestmentsInterests.lard',
        value: 'lard',
      },
      {
        label: 'InvestmentsInterests.musk',
        value: 'musk',
      },
      {
        label: 'InvestmentsInterests.pet_industry',
        value: 'pet_industry',
      },
      {
        label: 'InvestmentsInterests.pork_bellies',
        value: 'pork_bellies',
      },
      {
        label: 'InvestmentsInterests.sheep',
        value: 'sheep',
      },
      {
        label: 'InvestmentsInterests.silk',
        value: 'silk',
      },
      {
        label: 'InvestmentsInterests.sponges',
        value: 'sponges',
      },
      {
        label: 'InvestmentsInterests.tallow',
        value: 'tallow',
      },
      {
        label: 'InvestmentsInterests.whalebone',
        value: 'whalebone',
      },
      {
        label: 'InvestmentsInterests.wool',
        value: 'wool',
      },
      {
        label: 'InvestmentsInterests.coal',
        value: 'coal',
      },
      {
        label: 'InvestmentsInterests.compressed_hydrogen',
        value: 'compressed_hydrogen',
      },
    ],
  },
  real_estate: {
    label: 'InvestmentsInterests.real_estate',
    icon: <RealEstateIcon />,
    data: [
      {
        label: 'InvestmentsInterests.commercial',
        value: 'commercial',
      },
      {
        label: 'InvestmentsInterests.residential',
        value: 'residential',
      },
      {
        label: 'InvestmentsInterests.vacant_land_development_sites',
        value: 'vacant_land_development_sites',
      },
      {
        label: 'InvestmentsInterests.rural_farmland',
        value: 'rural_farmland',
      },
      {
        label: 'InvestmentsInterests.unfinished_developments',
        value: 'unfinished_developments',
      },
      {
        label: 'InvestmentsInterests.apartments',
        value: 'apartments',
      },
      {
        label: 'InvestmentsInterests.low_cost_housing',
        value: 'low_cost_housing',
      },
      {
        label: 'InvestmentsInterests.government_housing',
        value: 'government_housing',
      },
      {
        label: 'InvestmentsInterests.entire_commercial_buildings',
        value: 'entire_commercial_buildings',
      },
      {
        label: 'InvestmentsInterests.skyscrapers',
        value: 'skyscrapers',
      },
      {
        label: 'InvestmentsInterests.wineries',
        value: 'wineries',
      },
      {
        label: 'InvestmentsInterests.islands',
        value: 'islands',
      },
      {
        label: 'InvestmentsInterests.castles',
        value: 'castles',
      },
      {
        label: 'InvestmentsInterests.luxury_properties',
        value: 'luxury_properties',
      },
      {
        label: 'InvestmentsInterests.distressed_real_estate',
        value: 'distressed_real_estate',
      },
    ],
  },
  insurance: {
    label: 'InvestmentsInterests.insurance',
    icon: <InsuranceIcon />,
    data: [
      {
        label: 'InvestmentsInterests.life_insurance',
        value: 'life_insurance',
      },
      {
        label: 'InvestmentsInterests.home_insurance',
        value: 'home_insurance',
      },
      {
        label: 'InvestmentsInterests.automotive_insurance',
        value: 'automotive_insurance',
      },
      {
        label: 'InvestmentsInterests.business_insurance',
        value: 'business_insurance',
      },
      {
        label: 'InvestmentsInterests.travel_insurance',
        value: 'travel_insurance',
      },
      {
        label: 'InvestmentsInterests.liability_insurance',
        value: 'liability_insurance',
      },
      {
        label: 'InvestmentsInterests.landlord_renters_insurance',
        value: 'landlord_and_renters_insurance',
      },
      {
        label: 'InvestmentsInterests.caravan_insurance',
        value: 'caravan_insurance',
      },
      {
        label: 'InvestmentsInterests.fire_insurance',
        value: 'fire_insurance',
      },
      {
        label: 'InvestmentsInterests.marine_insurance',
        value: 'marine_insurance',
      },
      {
        label: 'InvestmentsInterests.pet_insurance',
        value: 'pet_insurance',
      },
      {
        label: 'InvestmentsInterests.motorbike_scooter_insurance',
        value: 'motorbike_and_scooter_insurance',
      },
      {
        label: 'InvestmentsInterests.re_insurance',
        value: 're_insurance',
      },
    ],
  },
  businesses_for_sale: {
    label: 'InvestmentsInterests.businesses_for_sale',
    icon: <BusinessesForSaleIcon />,
    data: [
      {
        label: 'InvestmentsInterests.bricks_mortar_businesses',
        value: 'bricks_and_mortar_businesses',
      },
      {
        label: 'InvestmentsInterests.online_businesses',
        value: 'online_businesses',
      },
      {
        label: 'InvestmentsInterests.franchise_opportunities',
        value: 'franchise_opportunities',
      },
      {
        label: 'InvestmentsInterests.distressed_businesses',
        value: 'distressed_businesses',
      },
    ],
  },
  miscellaneous: {
    label: 'InvestmentsInterests.miscellaneous',
    icon: <MiscellaneousIcon />,
    data: [
      {
        label: 'InvestmentsInterests.aircraft_leasing',
        value: 'aircraft_leasing',
      },
      {
        label: 'InvestmentsInterests.business_loans',
        value: 'business_loans',
      },
      {
        label: 'InvestmentsInterests.collectibles',
        value: 'collectibles',
      },
      {
        label: 'InvestmentsInterests.domain_names',
        value: 'domain_names',
      },
      {
        label: 'InvestmentsInterests.forex',
        value: 'forex',
      },
      {
        label: 'InvestmentsInterests.film_television',
        value: 'film_and_television',
      },
      {
        label: 'InvestmentsInterests.fine_art',
        value: 'fine_art',
      },
      {
        label: 'InvestmentsInterests.horses',
        value: 'miscellaneous_horses',
      },
      {
        label: 'InvestmentsInterests.intellectual_property',
        value: 'intellectual_property',
      },
      {
        label: 'InvestmentsInterests.music_rights',
        value: 'music_rights',
      },
      {
        label: 'InvestmentsInterests.peer_to_peer_lending',
        value: 'peer_to_peer_lending',
      },
      {
        label: 'InvestmentsInterests.private_lending',
        value: 'private_lending',
      },
      {
        label: 'InvestmentsInterests.royalties',
        value: 'royalties',
      },
      {
        label: 'InvestmentsInterests.sports',
        value: 'sports',
      },
      {
        label: 'InvestmentsInterests.storage_units',
        value: 'storage_units',
      },
    ],
  },
};
