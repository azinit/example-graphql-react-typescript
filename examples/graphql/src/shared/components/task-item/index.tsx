import React from 'react'
import cn from "classnames";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";

type Props = import("models").Todo;

// TODO: as feature
const TaskItem = (props: Props) => {
    const { completed, title, user, id } = props;

    return (
        <Card className={cn("task-item", { completed })}>
            <a className="task-item__title" href={`/${id}`}>{title}</a>
            <span className="task-item__author" >
                <UserOutlined />
                {user?.username}
            </span>
        </Card>
    )
}

export default TaskItem
