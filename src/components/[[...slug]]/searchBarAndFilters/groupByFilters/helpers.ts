import type {
  JobsEntity,
  SearchAndFilters,
  GroupByFiltersMappingEntity,
} from "@components/[[...slug]]/types";

const getGroupByFilters = (
  jobs: JobsEntity[],
  searchAndFilters: SearchAndFilters,
  currentFilter: GroupByFiltersMappingEntity,
  allFilters: GroupByFiltersMappingEntity[],
) => {
  const { jobSearchValue } = searchAndFilters;

  const allOtherFilters = allFilters.filter(
    ({ keyInStore }) => keyInStore !== currentFilter.keyInStore,
  );
  return jobs.reduce((groupByFilters, job) => {
    if (
      !job.name.includes(jobSearchValue) ||
      allOtherFilters.some(({ keyInStore, keyInApi }) => {
        return (
          (searchAndFilters as any)[keyInStore].length > 0 &&
          !(searchAndFilters as any)[keyInStore].includes(
            (job as any)[keyInApi].name,
          )
        );
      })
    ) {
      return groupByFilters;
    }

    if (
      Object.prototype.hasOwnProperty.call(
        groupByFilters,
        (job as any)[currentFilter.keyInApi].name,
      )
    ) {
      return {
        ...groupByFilters,
        [(job as any)[currentFilter.keyInApi].name]:
          (groupByFilters as any)[(job as any)[currentFilter.keyInApi].name] +
          1,
      };
    }
    return {
      ...groupByFilters,
      [(job as any)[currentFilter.keyInApi].name]: 1,
    };
  }, {});
};

export default getGroupByFilters;
