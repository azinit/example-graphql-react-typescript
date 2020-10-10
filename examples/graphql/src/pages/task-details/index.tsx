import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import {Alert, Spin  } from "antd";
import { TaskCard } from "shared/components";
import { useFetch } from "shared/hooks";

type Props = RouteComponentProps<{
    id: string;
}>;

const TaskDetails = (props: Props) => {
    const { id } = props.match.params;
    const { data, loading, error } = useFetch<any>(`todos/${id}`);

    if (loading) return <Spin />;
    if (error) return <Alert message={error.message || String(error)} type="error" showIcon />;
    if (data === null) return <>Not Found</>;
    return <TaskCard {...data} />;
}

export default TaskDetails
