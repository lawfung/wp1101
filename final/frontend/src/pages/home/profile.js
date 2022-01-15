import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";

import { useApolloClient, useSubscription } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { useUsername } from "../../tools/useUsername";

import {
  RECORD_QUERY,
  DELETE_RECORD_MUTATION,
  RECORD_SUBSCRIPTION
} from "../../graphql";

import { TimestampToDate } from "../../tools/constant";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h1  {
      margin: 50;
      font-size: 3em;
  }
`;

export default function Profile() {
  const { username } = useUsername();
  const [cookie] = useCookies(["session"]);
  const [localData, setLocalData] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);
  const client = useApolloClient();

  const { loading, data } = useSubscription(RECORD_SUBSCRIPTION);
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION);

  const dummy = useCallback(() => {
    const dummy2 = async () => {
      // console.log("start useEffect");
      let req = await client.query({
        query: RECORD_QUERY,
        variables: {strategyID: "", cookie: cookie.session},
        fetchPolicy: "no-cache"
      });
      // console.log(req.data.GetRecord);
      setLocalData(localData => req.data.GetRecord);
      // console.log("local data = ", ...localData);
      setFirstFetch(false);
    };
    dummy2();
  }, [client, cookie.session]);

  useEffect( () => { 
    console.log("dummy gogo");
    dummy();
  }, [dummy]);

  useEffect(() => {
    console.log("new subscription data: ", data);
    if (data) {
      const type = data.updateRecord.type;
      const id = data.updateRecord.info.id;
      if (type === "DELETED") {
        setLocalData(localData => localData.filter(item => item.id !== id));
      } else if (type === "CREATED") {
        setLocalData(localData => [...localData, data.updateRecord.info]);
      }
    }
  }, [loading, data]);

  const handleDeleteRecord = (id) => {
    deleteRecord({variables: {id: id, cookie: cookie.session}});
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "num",
    },
    {
      title: "Asset Type",
      dataIndex: "assetType",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (time) => (TimestampToDate(time))
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (time) => (TimestampToDate(time))
    },
    {
      title: "Start",
      dataIndex: "start",
    },
    {
      title: "End",
      dataIndex: "end",
    },
    {
      title: "High",
      dataIndex: "high",
    },
    {
      title: "Low",
      dataIndex: "low",
    },
    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <>
          <DeleteOutlined onClick={() => {handleDeleteRecord(id);}} />
        </>
      ),
    }
  ];
  return (
    <Wrapper>
      <Title>
        <h1>{username}'s Records</h1>
      </Title>
      <Table columns={columns} dataSource={firstFetch ? [] : localData.map((item, index) => {return {...item, num: index + 1, key: index};})} />
    </Wrapper>
  );
}

