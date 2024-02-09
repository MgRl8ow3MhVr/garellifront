export const queryMaker = ({ fields, populate, filters }) => {
  let query = "";
  if (fields) {
    for (let i = 0; i < fields.length; i++) {
      query += `&fields[${i}]=${fields[i]}`;
    }
  }

  if (filters) {
    for (let i = 0; i < filters.length; i++) {
      query += `&filters${filters[i]}`;
    }
  }

  if (populate) {
    for (let i = 0; i < populate.length; i++) {
      query += `&populate${populate[i]}`;
    }
  }
  // remove first '&'
  query = query.slice(1);
  return query;
};
