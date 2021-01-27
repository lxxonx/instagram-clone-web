import { gql, useQuery } from "@apollo/client";
const ME = gql`
  query me {
    me {
      username
      avatar
      fullname
    }
  }
`;
export default function useMeQuery() {
  const me = useQuery(ME);

  return me;
}
