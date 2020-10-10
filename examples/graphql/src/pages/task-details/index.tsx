import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import { Alert, Spin } from "antd";
import { TaskCard } from "shared/components";
import { useTodoQuery } from "./query.gen";

type Props = RouteComponentProps<{
    id: string;
}>;

const TaskDetails = (props: Props) => {
    const { id } = props.match.params;
    const { data, loading, error } = useTodoQuery({ variables: { id } });
    const { todo } = data || {};

    if (loading) return <Spin />;
    if (error) return <Alert message={error.message || String(error)} type="error" showIcon />;
    if (!todo) return <>Not Found</>;
    return <TaskCard {...todo} />;
}

export default TaskDetails
