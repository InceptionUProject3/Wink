const groupByPosition = (schedules) => {
    const initialVal = {};
    return schedules?.reduce((acc, current) => {
      if (!acc[current.position]) {
        acc[current.position] = [];
      }

      acc[current.position].push(current);
      //order emplyees in every group
      acc[current.position]?.sort((a, b) =>
        a.firstname > b.firstname ? 1 : -1
      );

      return acc;
    }, initialVal);
  };
  export default groupByPosition