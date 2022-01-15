import { gql } from "@apollo/client";

export const RECORD_QUERY = gql`
  query GetRecord($strategyID: ID!, $cookie: String!) {
    GetRecord(strategyID: $strategyID, cookie: $cookie) {
      assetType
      startTime
      endTime
      start
      end
      high
      low
      id
      username
    }
  }
`;

export const STRATEGY_QUERY = gql`
  query GetStrategy($id: ID!, $cookie: String!) {
    GetStrategy(id: $id, cookie: $cookie) {
      id
      name
      username
    }
  }
`;

export const Candlestick_QUERY = gql`
  query Candlestick($asset: String!, $startTime: Int!, $endTime: Int!, $scale: String!, $cookie: String!) {
    Candlestick(asset: $asset, startTime: $startTime, endTime: $endTime, scale: $scale, cookie: $cookie) {
      startTime
      scale
      open
      high
      low
      close
    }
  }
`

export const Username_QUERY = gql`
  query ($cookie: String!) {
    GetUsername(cookie: $cookie)
  }
`
