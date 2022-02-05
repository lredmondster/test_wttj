import type {
  JobsEntity,
  DropDownHeaderEntity,
} from "@components/[[...slug]]/types";

const getGroupByFilters = (
  jobs: JobsEntity[],
  jobSearchValue: string,
  currentFilter: DropDownHeaderEntity,
  allFilters: DropDownHeaderEntity[],
) => {
  const allOtherFilters = allFilters.filter(
    ({ key }) => key !== currentFilter.key,
  );
  return jobs.reduce((groupByFilters, job) => {
    if (
      !job.name.includes(jobSearchValue) ||
      allOtherFilters.some(
        ({ state, key }) => state.length > 0 && !state.includes(job[key].name),
      )
    ) {
      return groupByFilters;
    }

    if (
      Object.prototype.hasOwnProperty.call(
        groupByFilters,
        job[currentFilter.key].name,
      )
    ) {
      return {
        ...groupByFilters,
        [job[currentFilter.key].name]:
          groupByFilters[job[currentFilter.key].name] + 1,
      };
    }
    return { ...groupByFilters, [job[currentFilter.key].name]: 1 };
  }, {});
};

export default getGroupByFilters;
