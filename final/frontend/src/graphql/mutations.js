import { gql } from "@apollo/client";

export const DELETE_STRATEGY_MUTATION = gql`
  mutation DeleteStrategy($id: ID!, $cookie: String!) {
    DeleteStrategy(id: $id, cookie: $cookie)
  }
`;

export const RENAME_STRATEGY_MUTATION = gql`
  mutation RenameStrategy($id: ID!, $name: String!, $cookie: String!) {
    RenameStrategy(id: $id, name: $name, cookie: $cookie)
  }
`;

export const CREATE_RECORD_MUTATION = gql`
  mutation ($strategyName: String!, $assetType: String!, $startTime: Int!, $endTime: Int!, $start: Float!, $end: Float!, $high: Float!, $low: Float!, $cookie: String!) {
    CreateRecord(strategyName: $strategyName, assetType: $assetType, startTime: $startTime, endTime: $endTime, start: $start, end: $end, high: $high, low: $low, cookie: $cookie)
  }
`;

export const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecord($id: ID!, $cookie: String!) {
    DeleteRecord(id: $id, cookie: $cookie)
  }
`;

export const DELETE_RECORD_BY_STRATEGY_ID_MUTATION = gql`
  mutation DeleteRecordByStrategyID($strategyID: ID!, $cookie: String!) {
    DeleteRecordByStrategyID(strategyID: $strategyID, cookie: $cookie)
  }
`;

export const REGISTER_USER = gql`
mutation Register($user: String!, $hashPasswd: String!) {
  Register(user: $user, hashPasswd: $hashPasswd)
}
`;

export const LOGIN = gql`
  mutation ($user: String!, $hashPasswd: String!) {
    Login(user: $user, hashPasswd: $hashPasswd)
  }
`;

export const LOGOUT = gql`
  mutation ($user: String!, $cookie: String!) {
    Logout(user: $user, cookie: $cookie)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPasswd: String!, $newPasswd: String!, $cookie: String!) {
    ChangePassword(oldPasswd: $oldPasswd, newPasswd: $newPasswd, cookie: $cookie)
  }
`;
