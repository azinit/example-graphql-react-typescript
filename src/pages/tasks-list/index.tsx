import React from 'react'
import { Spin, Alert, Button } from "antd";
import { TaskItem } from "shared/components";
import { useTodosQuery } from "./query.gen";

const TasksList = () => {
    const { data, error, loading, refetch } = useTodosQuery({
        // Чтобы при рефетчинге менялся loading статус
        notifyOnNetworkStatusChange: true,
    });
    const query = data?.todos?.data;

    return (
        <div className="page tasks-list">
            <div className="page-content">
                <div className="tasks-list__toolbar text-center">
                    <Button
                        className="btn-refetch"
                        onClick={() => refetch()}
                        disabled={loading}
                        title="Refresh list of tasks"
                    >
                        Refresh
                    </Button>
                </div>
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        showIcon
                    />
                )}
                <div className="tasks-list__content position-relative pt-1">
                    {loading && <Spin className="loading--overlay" />}
                    <ul>
                        {query?.map((task) => (
                            <li key={task?.id}><TaskItem {...task} /></li>
                        ))}
                        {/* FIXME: yet (!query && !loading)  */}
                        {query?.length === 0 && (
                            <li>There are not tasks found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TasksList
