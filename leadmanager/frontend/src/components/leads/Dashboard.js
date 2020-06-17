// rfc
import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Leads />
            
        </Fragment>
    )
}

// 註解：Fragment用法，React 其中一種常見的使用情況是在一個 component 中回傳多個 element，fragment 讓你能夠在不用增加額外 DOM 節點的情況下，重新組合 child component。
// 詳情網址：https://zh-hant.reactjs.org/docs/fragments.html