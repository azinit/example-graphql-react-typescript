import React from 'react';
import cn from "classnames";
import { Card, Steps, Typography, Divider } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useFetch } from "shared/hooks";
import "./index.scss";

type Props = Task;

const ICON_STYLE = { color: '#08c' };

const getTaskStatus = (completed: boolean) => {
    if (completed) return 1;
    return 0;
};

// TODO: as feature
const TaskCard = (props: Props) => {
    const { completed, id, title, userId } = props;
    const { data: author } = useFetch<User>(`users/${userId}`);

    return (
        <Card
            className={cn("task-card", { completed })}
            title={`Task - ${title}`}
        >
            <div className="task-card__details">
                <i className="text-muted">Task description</i>
            </div>
            <div className="task-card__sidebar">
                <div className="task-card__author">
                    <Typography.Title level={5}>Author</Typography.Title>
                    <span className="task-card__author" >
                        <UserOutlined style={ICON_STYLE} /> {author?.username} {`<${author?.email}>`}
                        <br />
                        <HomeOutlined style={ICON_STYLE} /> {author?.company.name}
                    </span>
                </div>
                <Divider />
                <div className="task-card__status">
                    <Typography.Title level={5}>Status</Typography.Title>
                    <Steps direction="vertical" current={getTaskStatus(completed)}>
                        <Steps.Step title="Created" description="Task was created and added in todo-list." />
                        <Steps.Step title="Finished" description="Task was completed by author." />
                    </Steps>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard