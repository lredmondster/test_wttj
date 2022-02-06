export type JobsEntity = {
  id: number;
  reference: string;
  name: string;
  slug: string;
  description: string;
  published_at: string;
  created_at: dualLocaleFrenchEnglish;
  office: Office;
  department: Department;
  contract_type: ContractType;
  profile: string;
  recruitment_process: string;
  salary: Salary;
  cms_sites_references: string[];
  websites_urls: WebsitesUrlsEntity[];
  start_date?: dualLocaleFrenchEnglish | null;
};

export type dualLocaleFrenchEnglish = {
  fr: string;
  en: string;
};

export type Office = {
  id: number;
  name: string;
  address: string;
  zip_code: string;
  district: string;
  city: string;
  country: dualLocaleFrenchEnglish;
};

export type Department = {
  id: number;
  name: string;
};

export type ContractType = dualLocaleFrenchEnglish & {
  es: string;
  cs: string;
  sk: string;
};

export type Salary = {
  min: null;
  max: null;
  currency: string;
  period: string;
};

export type WebsitesUrlsEntity = {
  website_reference: string;
  url: string;
};

export type WebsitesEntity = {
  reference: string;
  kind: string;
  root_url: string;
  organization_url: string;
};

export type SearchAndFilters = {
  jobSearchValue: string;
  filterByOffices: string[];
  filterByDepartments: string[];
};

export type GroupByFiltersMappingEntity = {
  keyInStore: string;
  keyInApi: string;
  label: string;
  type: string;
};
