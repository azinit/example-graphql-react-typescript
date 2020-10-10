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
    // FIXME: more strict null case
    if (!todo || !todo?.id) return <Alert message="Task not found" type="error" showIcon />;
    return <TaskCard {...todo} />;
}

export default TaskDetails
